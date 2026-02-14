"use client";

import { useState, type ReactNode } from "react";

interface FolderProps {
    color?: string;
    size?: number;
    items?: ReactNode[];
    className?: string;
}

export default function Folder({
    color = "#c9a227",
    size = 1,
    items = [],
    className = "",
}: FolderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const maxVisiblePapers = 3;
    const papers = items.slice(0, maxVisiblePapers);

    return (
        <div
            className={`folder-wrapper ${className}`}
            style={{ transform: `scale(${size})` }}
            onClick={() => setIsOpen((prev) => !prev)}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
        >
            <div className={`folder ${isOpen ? "open" : ""} ${isDragging ? "dragging" : ""}`}>
                {/* Papéis dentro da pasta */}
                <div className="folder-papers">
                    {papers.map((item, index) => (
                        <div
                            key={index}
                            className="folder-paper"
                            style={{
                                "--index": index,
                                "--total": papers.length,
                            } as React.CSSProperties}
                        >
                            <div className="paper-content">
                                {item}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Aba da pasta */}
                <div
                    className="folder-tab"
                    style={{ backgroundColor: color }}
                />

                {/* Corpo da pasta (fundo) */}
                <div
                    className="folder-back"
                    style={{ backgroundColor: color }}
                />

                {/* Corpo da pasta (frente) */}
                <div
                    className="folder-front"
                    style={{
                        backgroundColor: color,
                        filter: "brightness(0.85)",
                    }}
                />
            </div>

            <style jsx>{`
                .folder-wrapper {
                    cursor: pointer;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    user-select: none;
                    transform-origin: center;
                }

                .folder {
                    position: relative;
                    width: 120px;
                    height: 90px;
                    perspective: 400px;
                    transition: transform 0.3s ease;
                }

                .folder:hover {
                    transform: translateY(-4px);
                }

                .folder.dragging {
                    transform: scale(0.96);
                }

                /* ── Aba superior ── */
                .folder-tab {
                    position: absolute;
                    top: -10px;
                    left: 8px;
                    width: 40px;
                    height: 14px;
                    border-radius: 4px 4px 0 0;
                    z-index: 1;
                }

                /* ── Fundo da pasta ── */
                .folder-back {
                    position: absolute;
                    inset: 0;
                    border-radius: 0 6px 6px 6px;
                    z-index: 0;
                }

                /* ── Frente da pasta ── */
                .folder-front {
                    position: absolute;
                    inset: 0;
                    border-radius: 0 6px 6px 6px;
                    z-index: 10;
                    transform-origin: bottom center;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .folder.open .folder-front {
                    transform: rotateX(-50deg);
                }

                /* ── Papéis ── */
                .folder-papers {
                    position: absolute;
                    inset: 4px;
                    z-index: 5;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .folder-paper {
                    position: absolute;
                    width: 85%;
                    height: 70%;
                    background: #f5f5f0;
                    border-radius: 3px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
                    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                    transform: translateY(10px);
                    overflow: hidden;
                }

                .paper-content {
                    padding: 6px;
                    font-size: 7px;
                    color: #333;
                    line-height: 1.3;
                    overflow: hidden;
                    height: 100%;
                }

                .folder.open .folder-paper {
                    transform: translateY(
                        calc(-30px - (var(--index) * 12px))
                    );
                }

                .folder.open .folder-paper:nth-child(1) {
                    z-index: 8;
                }
                .folder.open .folder-paper:nth-child(2) {
                    z-index: 7;
                }
                .folder.open .folder-paper:nth-child(3) {
                    z-index: 6;
                }
            `}</style>
        </div>
    );
}
