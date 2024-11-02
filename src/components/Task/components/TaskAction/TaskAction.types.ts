import { FC, ReactNode, SVGProps } from "react";

export interface TaskActionProps {
    action: (value: unknown) => void;
    size?: number;
    icon: FC<SVGProps<SVGSVGElement>>;
    isWarning?: boolean;
	tooltipContent?: string | ReactNode;
}	