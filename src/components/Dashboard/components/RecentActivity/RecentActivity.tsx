import { TaskData } from "@/types/task";

interface RecentActivityProps {
    tasks: TaskData[];
}

const truncateText = (text: string, maxLength: number = 50) =>
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

const getActivityDescription = (task: TaskData) => {
    if (task.isCompleted) return "Task completed";
    if (task.dueDate && new Date(task.dueDate) < new Date()) return "Task overdue";
    return "Task updated";
};

export default function RecentActivity({ tasks }: RecentActivityProps) {
    const recentTasks = tasks
        .filter((t) => t.completedAt || (t.dueDate && new Date(t.dueDate) < new Date()))
        .sort((a, b) => {
            const dateA = a.completedAt || a.dueDate || "";
            const dateB = b.completedAt || b.dueDate || "";
            return new Date(dateB).getTime() - new Date(dateA).getTime();
        })
        .slice(0, 5);

    return (
        <div className="dashboard__activity">
            {recentTasks.map((task) => (
                <div key={task.id} className="dashboard__activity-item">
                    <div className="dashboard__activity-main">
                        <span className="dashboard__activity-text">
                            {truncateText(task.text)}
                        </span>
                        {task.label && (
                            <span className={`dashboard__activity-label dashboard__activity-label--${task.color || "gray"}`}>
                                {task.label}
                            </span>
                        )}
                    </div>
                    <div className="dashboard__activity-info">
                        <span className="dashboard__activity-status">
                            {getActivityDescription(task)}
                        </span>
                        {task.dueDate && (
                            <span className="dashboard__activity-due">
                                Due: {new Date(task.dueDate).toLocaleString()}
                            </span>
                        )}
                        {task.completedAt && (
                            <span className="dashboard__activity-date">
                                {new Date(task.completedAt).toLocaleString()}
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}