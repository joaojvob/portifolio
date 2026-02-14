"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { NAV_LINKS } from "@/lib/constants";

export function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const tlRefs = useRef<(gsap.core.Timeline | null)[]>([]);
    const activeTweenRefs = useRef<(gsap.core.Tween | null)[]>([]);
    const hamburgerRef = useRef<HTMLButtonElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const lastScrollY = useRef(0);
    const isHidden = useRef(false);

    const layoutPills = useCallback(() => {
        circleRefs.current.forEach((circle, index) => {
            if (!circle?.parentElement) return;

            const pill = circle.parentElement as HTMLElement;
            const rect = pill.getBoundingClientRect();
            const { width: w, height: h } = rect;
            const R = ((w * w) / 4 + h * h) / (2 * h);
            const D = Math.ceil(2 * R) + 2;
            const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
            const originY = D - delta;

            circle.style.width = `${D}px`;
            circle.style.height = `${D}px`;
            circle.style.bottom = `-${delta}px`;

            gsap.set(circle, {
                xPercent: -50,
                scale: 0,
                transformOrigin: `50% ${originY}px`,
            });

            const label = pill.querySelector<HTMLElement>(".pill-label");
            const hover = pill.querySelector<HTMLElement>(".pill-label-hover");

            if (label) gsap.set(label, { y: 0 });
            if (hover) gsap.set(hover, { y: h + 12, opacity: 0 });

            tlRefs.current[index]?.kill();
            const tl = gsap.timeline({ paused: true });
            const ease = "power3.out";

            tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" }, 0);

            if (label) {
                tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: "auto" }, 0);
            }

            if (hover) {
                gsap.set(hover, { y: Math.ceil(h + 100), opacity: 0 });
                tl.to(hover, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0);
            }

            tlRefs.current[index] = tl;
        });
    }, []);

    useEffect(() => {
        layoutPills();

        window.addEventListener("resize", layoutPills);
        if (document.fonts) {
            document.fonts.ready.then(layoutPills).catch(() => {});
        }

        const menu = mobileMenuRef.current;
        if (menu) {
            gsap.set(menu, { visibility: "hidden", opacity: 0, y: 10 });
        }

        return () => window.removeEventListener("resize", layoutPills);
    }, [layoutPills]);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            const nav = navRef.current;
            if (!nav) return;

            if (currentY < 80) {
                if (isHidden.current) {
                    gsap.to(nav, { y: 0, duration: 0.4, ease: "power3.out" });
                    isHidden.current = false;
                }
            } else if (currentY > lastScrollY.current + 5) {
                if (!isHidden.current) {
                    gsap.to(nav, { y: -80, duration: 0.4, ease: "power3.out" });
                    isHidden.current = true;
                }
            } else if (currentY < lastScrollY.current - 5) {
                if (isHidden.current) {
                    gsap.to(nav, { y: 0, duration: 0.4, ease: "power3.out" });
                    isHidden.current = false;
                }
            }

            lastScrollY.current = currentY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handlePillEnter = (i: number) => {
        const tl = tlRefs.current[i];
        if (!tl) return;
        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
            duration: 0.3,
            ease: "power3.out",
            overwrite: "auto",
        });
    };

    const handlePillLeave = (i: number) => {
        const tl = tlRefs.current[i];
        if (!tl) return;
        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.tweenTo(0, {
            duration: 0.2,
            ease: "power3.out",
            overwrite: "auto",
        });
    };

    const toggleMobile = () => {
        const next = !mobileOpen;
        setMobileOpen(next);

        const btn = hamburgerRef.current;
        const menu = mobileMenuRef.current;
        const ease = "power3.out";

        if (btn) {
            const lines = btn.querySelectorAll<HTMLElement>(".hamburger-line");
            if (next) {
                gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
                gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
            } else {
                gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
                gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
            }
        }

        if (menu) {
            if (next) {
                gsap.set(menu, { visibility: "visible" });
                gsap.fromTo(
                    menu,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.3, ease, transformOrigin: "top center" }
                );
            } else {
                gsap.to(menu, {
                    opacity: 0,
                    y: 10,
                    duration: 0.2,
                    ease,
                    transformOrigin: "top center",
                    onComplete: () => { gsap.set(menu, { visibility: "hidden" }); },
                });
            }
        }
    };

    const handleMobileLink = () => {
        if (mobileOpen) toggleMobile();
    };

    return (
        <div className="fixed top-[1.2em] left-1/2 -translate-x-1/2 w-[92%] max-w-[700px] z-50 md:top-[1.5em]">
            <nav
                ref={navRef}
                aria-label="Navegação principal"
                className="w-full flex items-center justify-center"
            >
                <div
                    className="hidden md:flex items-center rounded-full px-[3px]"
                    style={{
                        height: "42px",
                        backgroundColor: "rgba(18, 19, 26, 0.7)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                >
                    <ul
                        role="menubar"
                        className="list-none flex items-stretch m-0 p-[3px] h-full gap-[3px]"
                    >
                        {NAV_LINKS.map((link, i) => (
                            <li key={link.href} role="none" className="flex h-full">
                                <a
                                    role="menuitem"
                                    href={link.href}
                                    className="relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full font-medium text-[14px] leading-none uppercase tracking-wide whitespace-nowrap cursor-pointer px-5"
                                    style={{
                                        backgroundColor: "rgba(255, 255, 255, 0.06)",
                                        color: "var(--color-muted)",
                                    }}
                                    onMouseEnter={() => handlePillEnter(i)}
                                    onMouseLeave={() => handlePillLeave(i)}
                                >
                                    <span
                                        className="absolute left-1/2 bottom-0 rounded-full block pointer-events-none"
                                        style={{
                                            backgroundColor: "var(--color-accent)",
                                            willChange: "transform",
                                        }}
                                        aria-hidden="true"
                                        ref={(el) => { circleRefs.current[i] = el; }}
                                    />
                                    <span className="relative inline-block leading-none z-[2]">
                                        <span
                                            className="pill-label relative z-[2] inline-block leading-none"
                                            style={{ willChange: "transform" }}
                                        >
                                            {link.label}
                                        </span>
                                        <span
                                            className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                                            style={{
                                                color: "var(--color-background)",
                                                willChange: "transform, opacity",
                                            }}
                                            aria-hidden="true"
                                        >
                                            {link.label}
                                        </span>
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <button
                    ref={hamburgerRef}
                    onClick={toggleMobile}
                    aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
                    aria-expanded={mobileOpen}
                    className="md:hidden rounded-full border-0 flex flex-col items-center justify-center gap-[5px] cursor-pointer p-0"
                    style={{
                        width: "42px",
                        height: "42px",
                        backgroundColor: "rgba(18, 19, 26, 0.7)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                >
                    <span
                        className="hamburger-line w-[18px] h-[2px] rounded origin-center"
                        style={{ backgroundColor: "var(--color-foreground)" }}
                    />
                    <span
                        className="hamburger-line w-[18px] h-[2px] rounded origin-center"
                        style={{ backgroundColor: "var(--color-foreground)" }}
                    />
                </button>
            </nav>

            <div
                ref={mobileMenuRef}
                className="md:hidden absolute top-[3.2em] left-0 right-0 rounded-2xl shadow-lg z-50 origin-top"
                style={{
                    backgroundColor: "rgba(18, 19, 26, 0.9)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
            >
                <ul className="list-none m-0 p-[6px] flex flex-col gap-[3px]">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                onClick={handleMobileLink}
                                className="block py-3 px-4 text-[15px] font-medium rounded-xl transition-colors duration-200 no-underline"
                                style={{
                                    color: "var(--color-muted)",
                                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "var(--color-accent)";
                                    e.currentTarget.style.color = "var(--color-background)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
                                    e.currentTarget.style.color = "var(--color-muted)";
                                }}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
