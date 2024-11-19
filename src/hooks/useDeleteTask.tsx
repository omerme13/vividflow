import { useCallback } from "react";
import { useTaskContext } from "@/context/TaskContext";
import useToast, { ToastType } from "@/hooks/useToast";

export default function useDeleteTask(id: string | undefined, onComplete?: () => void) {
    const { deleteTask, restoreTask } = useTaskContext();

    const notify = useToast({
        text: "The task has been deleted",
        type: ToastType.Success,
        action: {
            text: "undo",
            onClick: () => (id ? restoreTask(id) : null),
        },
    });

    return useCallback(() => {
        if (!id) {
            console.warn("Cannot delete task: no task ID provided");
            return;
        }

        deleteTask(id);
        notify();
		if (onComplete) onComplete();
    }, [id, deleteTask, notify, onComplete]);
}
