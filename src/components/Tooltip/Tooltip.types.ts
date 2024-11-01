import { ReactNode } from "react";

export interface TooltipProps {
    content: string | ReactNode;
    children: ReactNode;
    delay?: number;
    className?: string;
}
