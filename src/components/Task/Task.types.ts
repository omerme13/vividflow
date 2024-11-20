import { TaskData } from "@/types/task";
export interface TaskProps {
	task: TaskData;
	onEdit: () => void;
	isGridMode?: boolean;
}
