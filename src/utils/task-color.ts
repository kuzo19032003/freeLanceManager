import { TaskPriority, TaskStatus } from "@/types/task.type";

export function getTaskColor(status: string): string {
    const statusColor: Record<string, string> = {
        Todo: 'rgba(108, 145, 133, 1)',
        InProgress: 'rgb(76, 138, 205)',
        OverDue: 'rgb(201, 3, 33)',
        Completed: 'rgb(87, 192, 173)',
        Pending: 'rgb(139, 92, 219)'
    }
    return statusColor[status] || 'rgb(76, 138, 205)';
}
export function getTaskBgColor(status: string): string {
    const statusBgColor: Record<string, string> = {
        Todo: 'rgb(25, 39, 52)',
        InProgress: 'rgb(28, 48, 72)',
        OverDue: 'rgba(77, 24, 41, 1)',
        Completed: 'rgb(31, 70, 75)',
        Pending: 'rgb(49, 42, 84)'
    }
    return statusBgColor[status] || 'rgb(28, 48, 72)';
}
export function getTaskPriorityColor(priority: TaskPriority): string {
    const priorityColor = {
        High: 'rgba(248, 26, 59, 0.94)',
        Medium: 'rgb(255, 159, 67)',
        Low: 'rgb(87, 192, 173)',
    }
    return priorityColor[priority] || 'rgb(76, 138, 205)';
}
export function getTaskPriorityBgColor(priority: TaskPriority): string {
    const priorityBgColor = {
        High: 'rgba(77, 24, 41, 1)',
        Medium: 'rgb(60, 44, 29)',
        Low: 'rgb(31, 70, 75)',
    }
    return priorityBgColor[priority] || 'rgb(76, 138, 205)';
}