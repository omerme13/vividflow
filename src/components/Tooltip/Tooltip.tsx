import { useState, useEffect, useRef, MouseEvent } from "react";
import { TooltipProps } from "./Tooltip.types";

import "./Tooltip.scss";

const calculatePosition = (mouseX: number, mouseY: number, tooltipElement: HTMLElement) => {
    const rect = tooltipElement.getBoundingClientRect();
    const offset = 10;
    let x = mouseX + offset;
    let y = mouseY + offset;

    if (x + rect.width > window.innerWidth) {
        x = mouseX - rect.width - offset;
    }
    if (y + rect.height > window.innerHeight) {
        y = mouseY - rect.height - offset;
    }

    return {
        x: Math.max(offset, x),
        y: Math.max(offset, y),
    };
};

export default function Tooltip({ content, children, delay = 500, className = "" }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const mousePosition = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (isVisible && tooltipRef.current) {
            const pos = calculatePosition(mousePosition.current.x, mousePosition.current.y, tooltipRef.current);
            setPosition(pos);
        }
    }, [isVisible]);

    const showTooltip = (e: MouseEvent<HTMLDivElement>) => {
        mousePosition.current = { x: e.clientX, y: e.clientY };
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
    };

    const hideTooltip = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsVisible(false);
    };

    const updatePosition = (e: MouseEvent<HTMLDivElement>) => {
        if (!isVisible || !tooltipRef.current) return;
        mousePosition.current = { x: e.clientX, y: e.clientY };
        const pos = calculatePosition(e.clientX, e.clientY, tooltipRef.current);
        setPosition(pos);
    };

    if (!content) return children;

    return (
        <div
            className={`tooltip ${className}`}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onMouseMove={updatePosition}
        >
            <div className="tooltip__trigger">{children}</div>
            {isVisible && (
                <div
                    ref={tooltipRef}
                    className="tooltip__content"
                    style={{
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                    }}
                >
                    {content}
                </div>
            )}
        </div>
    );
}
