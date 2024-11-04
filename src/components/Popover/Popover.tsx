import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import useClickOutside from "@/hooks/useClickOutside";
import { PopoverProps } from "./Popover.types";
import "./Popover.scss";

const OFFSET = 20;

export default function Popover({ trigger, triggerClassName = "", children, marginFromBorders = 0 }: PopoverProps) {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useClickOutside({
        refs: [triggerRef, contentRef],
        handler: () => setIsOpen(false),
        enabled: isOpen,
    });

    useEffect(() => {
        if (!isOpen || !triggerRef.current || !contentRef.current) return;

        const updatePosition = () => {
            const triggerRect = triggerRef.current!.getBoundingClientRect();
            const contentRect = contentRef.current!.getBoundingClientRect();
            const viewportWidth = document.documentElement.clientWidth;
            const viewportHeight = window.innerHeight;

            let top = triggerRect.bottom;
            let left = triggerRect.left;

            if (left + contentRect.width > viewportWidth) {
                left = viewportWidth - contentRect.width;
            }

            const shouldPositionAbove = top + contentRect.height > viewportHeight;
            if (shouldPositionAbove) {
                top = triggerRect.top - contentRect.height - OFFSET;
            }

            setPosition({
                top: Math.min(Math.max(marginFromBorders, top), viewportHeight - contentRect.height),
                left: Math.min(
                    Math.max(marginFromBorders, left),
                    viewportWidth - contentRect.width - marginFromBorders
                ),
            });
        };

        updatePosition();
        window.addEventListener("resize", updatePosition);
        return () => window.removeEventListener("resize", updatePosition);
    }, [isOpen, marginFromBorders]);

    return (
        <>
            <button
                ref={triggerRef}
                className={`popover__trigger ${triggerClassName}`}
                onClick={() => setIsOpen(!isOpen)}
                type="button"
            >
                {trigger}
            </button>

            {isOpen &&
                createPortal(
                    <div
                        ref={contentRef}
                        className="popover__content"
                        style={{
                            position: "fixed",
                            top: `${position.top}px`,
                            left: `${position.left}px`,
                            maxWidth: `calc(100vw - ${marginFromBorders * 2}px)`,
                            maxHeight: `calc(100vh - ${marginFromBorders * 2}px)`,
                        }}
                    >
                        {children}
                    </div>,
                    document.body
                )}
        </>
    );
}
