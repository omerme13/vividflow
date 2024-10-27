
import { TaskActionProps } from "./TaskAction.types";

import "./TaskAction.scss";

export default function TaskAction({ action, size, icon: Icon, isWarning }: TaskActionProps) {
    return (
        <Icon
            className={`task-action ${isWarning ? "task-action--warning" : ""}`}
            onClick={action}
            {...(size && { width: size, height: size })}
        />
    );
}
