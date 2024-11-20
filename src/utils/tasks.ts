import { TaskData } from "@/types/task";

export const extractUniqueLabels = (tasks: TaskData[]) =>
    Array.from(new Set(tasks.map((task) => task.label).filter((label): label is string => !!label)));
