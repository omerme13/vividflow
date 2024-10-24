import { FC, SVGProps } from "react";

import "./TaskAction.scss";
interface TaskActionProps {
    action: (value: unknown) => void;
    size?: number;
    icon: FC<SVGProps<SVGSVGElement>>;
    isWarning?: boolean;
}

export default function TaskAction({ action, size, icon: Icon, isWarning }: TaskActionProps) {
    return (
        <Icon
            className={`task-action ${isWarning ? "task-action--warning" : ""}`}
            onClick={action}
            {...(size && { width: size, height: size })}
        />
    );
}
