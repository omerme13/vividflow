import { FC, SVGProps } from "react";

import "./CardAction.scss";
interface CardActionProps {
    action: (value: unknown) => void;
    size?: number;
    icon: FC<SVGProps<SVGSVGElement>>;
    isWarning?: boolean;
}

export default function CardAction({ action, size, icon: Icon, isWarning }: CardActionProps) {
    return (
        <Icon
            className={`card-action ${isWarning ? "card-action--warning" : ""}`}
            onClick={action}
            {...(size && { width: size, height: size })}
        />
    );
}
