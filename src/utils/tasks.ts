import { TaskData } from "@/components/Task";

export const extractUniqueLabels = (tasks: TaskData[]) =>
    Array.from(new Set(tasks.map((task) => task.label).filter((label): label is string => !!label)));
