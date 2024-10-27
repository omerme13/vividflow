import { FC, SVGProps } from "react";

export interface TaskActionProps {
    action: (value: unknown) => void;
    size?: number;
    icon: FC<SVGProps<SVGSVGElement>>;
    isWarning?: boolean;
}