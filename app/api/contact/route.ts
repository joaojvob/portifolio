import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_MESSAGE = 5000;

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/** Processa o envio do formulário de contato. */
export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Todos os campos são obrigatórios." },
                { status: 400 }
            );
        }

        if (!EMAIL_REGEX.test(email)) {
            return NextResponse.json(
                { error: "Formato de e-mail inválido." },
                { status: 400 }
            );
        }

        if (name.length > MAX_NAME || message.length > MAX_MESSAGE) {
            return NextResponse.json(
                { error: "Nome ou mensagem excede o tamanho permitido." },
                { status: 400 }
            );
        }

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeMessage = escapeHtml(message);

        const { error } = await resend.emails.send({
            from: "Portfólio <onboarding@resend.dev>",
            to: process.env.CONTACT_EMAIL!,
            subject: `Novo contato de ${safeName}`,
            replyTo: email,
            html: `
                <h2>Nova mensagem do portfólio</h2>
                <p><strong>Nome:</strong> ${safeName}</p>
                <p><strong>Email:</strong> ${safeEmail}</p>
                <p><strong>Mensagem:</strong></p>
                <p>${safeMessage}</p>
            `,
        });

        if (error) {
            return NextResponse.json(
                { error: "Erro ao enviar e-mail." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: "Mensagem enviada com sucesso!" },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { error: "Erro interno do servidor." },
            { status: 500 }
        );
    }
}
