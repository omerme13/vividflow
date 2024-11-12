import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import useClickOutside from "@/hooks/useClickOutside";
import "./Popover.scss";
import { PopoverProps } from "./Popover.types";

export default function Popover({
    trigger,
    children,
    triggerClassName = "",
    marginFromBorders = 10,
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

            const absoluteTop = triggerRect.bottom + window.scrollY;
            const absoluteLeft = triggerRect.left + window.scrollX;

            let top = absoluteTop;
            let left = absoluteLeft;

            const viewportBottom = window.scrollY + window.innerHeight;
            if (absoluteTop + contentRect.height > viewportBottom - marginFromBorders) {
                top = absoluteTop - contentRect.height - triggerRect.height;
            }

            const viewportRight = window.scrollX + document.documentElement.clientWidth;
            if (absoluteLeft + contentRect.width > viewportRight - marginFromBorders) {
                left = absoluteLeft + triggerRect.width - contentRect.width;
            }

            left = Math.max(window.scrollX + marginFromBorders, left);
            top = Math.max(window.scrollY + marginFromBorders, top);

            setPosition({ top, left });
        };

        updatePosition();
        window.addEventListener("scroll", updatePosition, true);
        window.addEventListener("resize", updatePosition);

        return () => {
            window.removeEventListener("scroll", updatePosition, true);
            window.removeEventListener("resize", updatePosition);
        };
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
                            position: "absolute",
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
