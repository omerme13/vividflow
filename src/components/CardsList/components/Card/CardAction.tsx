import { FC, SVGProps } from "react";

import "./CardAction.scss";
import { fileURLToPath } from "url";

interface CardActionProps {
    action: () => void;
    size?: number;
    icon: FC<SVGProps<SVGSVGElement>>;
	isWarning?: boolean;
}

const CardAction: FC<CardActionProps> = ({ action, size, icon: Icon, isWarning }) => {
    return (
        <Icon
            className={`card-action ${isWarning ? 'card-action--warning' : ''}`}
            onClick={action}
            {...(size && { width: size, height: size })}
        />
    );
};

export default CardAction;
