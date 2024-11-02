import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import useClickOutside from "@/hooks/useClickOutside";
import { PopoverProps } from './Popover.types';

import "./Popover.scss";


export default function Popover({ trigger, triggerClassName = "", children }: PopoverProps) {
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
        if (isOpen && triggerRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const scrollY = window.scrollY;
            const scrollX = window.scrollX;

            setPosition({
                top: triggerRect.bottom + scrollY,
                left: triggerRect.left + scrollX,
            });
        }
    }, [isOpen]);

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
                            position: 'absolute',
                            top: `${position.top}px`,
                            left: `${position.left}px`,
                        }}
                    >
                        {children}
                    </div>,
                    document.body
                )
            }
        </>
    );
}