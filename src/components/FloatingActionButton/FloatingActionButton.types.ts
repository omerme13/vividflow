import { FC, SVGProps } from "react";

export interface FloatingActionButtonProps {
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    icon: FC<SVGProps<SVGSVGElement>>;
}