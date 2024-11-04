import { TaskActionProps } from "./TaskAction.types";
import Tooltip from "@/components/Tooltip";

import "./TaskAction.scss";
import { getClassWithModifier } from "@/utils/styles";

export default function TaskAction({ action, size, icon: Icon, isWarning, tooltipContent, isActive }: TaskActionProps) {
    return (
        <Tooltip content={tooltipContent}>
            <Icon
                className={`${getClassWithModifier("task-action", "warning", !!isWarning)}
				${getClassWithModifier("task-action", "active", isActive)}`}
                onClick={action}
                {...(size && { width: size, height: size })}
            />
        </Tooltip>
    );
}
