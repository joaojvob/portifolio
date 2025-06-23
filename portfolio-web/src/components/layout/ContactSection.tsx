import React from 'react';
import { motion } from 'framer-motion';

interface ContactProps {
  email?: string;
}

export default function ContactSection({ email }: ContactProps) {
  return (
    <motion.footer
      className="bg-slate-800 text-white py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Vamos Conversar?</h2>
        <p className="text-slate-300 mb-8 max-w-xl mx-auto">
          Estou sempre aberto a novas oportunidades, colaborações e um bom bate-papo sobre tecnologia.
        </p>
        <a
          href={`mailto:${email}`}
          className="inline-block bg-indigo-600 text-white font-bold text-lg py-4 px-8 rounded-lg hover:bg-indigo-500 transition duration-300 shadow-lg transform hover:scale-105"
        >
          Envie um Email
        </a>
      </div>
    </motion.footer>
  );
}