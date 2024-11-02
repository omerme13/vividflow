import { useState, useEffect, useRef, MouseEvent } from "react";
import { TooltipProps } from "./Tooltip.types";

import "./Tooltip.scss";

const calculatePosition = (x: number, y: number, tooltipElement: HTMLElement) => {
    const tooltipRect = tooltipElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (x + tooltipRect.width > viewportWidth) {
        x = x - tooltipRect.width;
    }

    if (y + tooltipRect.height > viewportHeight) {
        y = y - tooltipRect.height;
    }

    return { x, y };
};

export default function Tooltip({ content, children, delay = 500, className = "" }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const showTooltip = (e: MouseEvent<HTMLDivElement>) => {
		setPosition({ x: e.clientX, y: e.clientY });
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
        }, delay);
    };

    const hideTooltip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(false);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (tooltipRef.current) {
            const { x, y } = calculatePosition(e.clientX, e.clientY, tooltipRef.current);
            setPosition({ x, y });
        }
    };

    if (!content) return children;

    return (
        <div
            className={`tooltip ${className}`}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onMouseMove={handleMouseMove}
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
