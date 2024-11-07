// Popover.tsx
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import useClickOutside from "@/hooks/useClickOutside";
import "./Popover.scss";
import { PopoverProps } from "./Popover.types";

export default function Popover({
    trigger,
    children,
    triggerClassName = "",
    marginFromBorders = 0,
    isOpen: controlledIsOpen,
    onOpenChange,
}: PopoverProps) {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

    const handleOpenChange = (newIsOpen: boolean) => {
        if (!isControlled) {
            setInternalIsOpen(newIsOpen);
        }
        onOpenChange?.(newIsOpen);
    };

    useClickOutside({
        refs: [triggerRef, contentRef],
        handler: () => handleOpenChange(false),
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
                top = triggerRect.top - contentRect.height;
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
                onClick={() => handleOpenChange(!isOpen)}
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
