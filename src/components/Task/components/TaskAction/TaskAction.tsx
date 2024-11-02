import { TaskActionProps } from "./TaskAction.types";
import Tooltip from "@/components/Tooltip";

import "./TaskAction.scss";

export default function TaskAction({ action, size, icon: Icon, isWarning, tooltipContent }: TaskActionProps) {
    return (
        <Tooltip content={tooltipContent}>
            <Icon
                className={`task-action ${isWarning ? "task-action--warning" : ""}`}
                onClick={action}
                {...(size && { width: size, height: size })}
            />
        </Tooltip>
    );
}
