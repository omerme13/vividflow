import { TaskData } from "@/types/task";

export interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    task?: TaskData;
    isEditMode: boolean;
	dueDate?: Date;
}