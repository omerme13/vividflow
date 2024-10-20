import { FC } from "react";

import './CardAction.scss';

interface CardActionProps {
    action: () => void;
    size?: number;
    icon: FC<React.SVGProps<SVGSVGElement>>;
}

const CardAction: FC<CardActionProps> = ({ action, size, icon: Icon }) => {
    return <Icon className="card-action" onClick={action} {...(size && { width: size, height: size })} />;
};

export default CardAction;
