import { TaskActionProps } from "./TaskAction.types";
import Tooltip from "@/components/Tooltip";
import { getClassWithModifier } from "@/utils/styles";

import "./TaskAction.scss";

export default function TaskAction({
    action,
    size,
    icon: Icon,
    isWarning = false,
    tooltipContent,
    isActive = false,
}: TaskActionProps) {
    const className = `
	${getClassWithModifier("task-action", "warning", isWarning)}
	 ${getClassWithModifier("task-action", "active", isActive)}`;

    return (
        <Tooltip content={tooltipContent}>
            <Icon className={className} onClick={action} {...(size && { width: size, height: size })} />
        </Tooltip>
    );
}
