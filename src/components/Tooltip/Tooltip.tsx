import { useState, useEffect, useRef } from "react";
import { TooltipProps } from "./Tooltip.types";

import "./Tooltip.scss";

export default function Tooltip({ content, children, delay = 200, className = "" }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const showTooltip = () => {
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

    const handleMouseMove = (e: React.MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
    };

    if (!content) return <>{children}</>;

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
