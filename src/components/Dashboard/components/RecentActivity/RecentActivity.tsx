import { TaskData } from "@/types/task";
import { format } from "date-fns";
import DashboardItem from "../DashboardItem/DashboardItem";
import { DashboardChildProps } from "@/types/dashboard";

import "./RecentActivity.scss";

// TODO make functionality better, move logic outside
const getActivityDescription = (task: TaskData) => {
    if (task.isCompleted) return "Task completed";
    if (task.dueDate && new Date(task.dueDate) < new Date()) return "Task overdue";
    return "Task updated";
};

export default function RecentActivity({ tasks }: DashboardChildProps) {
    const recentTasks = tasks
        .filter((t) => t.completedAt || (t.dueDate && new Date(t.dueDate) < new Date()))
        .sort((a, b) => {
            const dateA = a.completedAt || a.dueDate || "";
            const dateB = b.completedAt || b.dueDate || "";
            return new Date(dateB).getTime() - new Date(dateA).getTime();
        })
        .slice(0, 5);

    return (
        <DashboardItem className="recent-activity" title="Recent Activity" fullRow>
            {recentTasks.map((task) => (
                <div key={task.id} className="recent-activity__item">
                    <div className="recent-activity__main">
                        <span className="recent-activity__text">{task.text}</span>
                        {task.label && (
                            <span className={`recent-activity__label recent-activity__label--${task.color || "gray"}`}>
                                {task.label}
                            </span>
                        )}
                    </div>
                    <div className="recent-activity__info">
                        <span className="recent-activity__status">{getActivityDescription(task)}</span>
                        {task.dueDate && (
                            <span className="recent-activity__due">
                                Due: {format(new Date(task.dueDate), "dd/MM/yyyy, HH:mm")}
                            </span>
                        )}
                        {task.completedAt && (
                            <span className="recent-activity__date">
                                {format(new Date(task.completedAt), "dd/MM/yyyy, HH:mm")}
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </DashboardItem>
    );
}
