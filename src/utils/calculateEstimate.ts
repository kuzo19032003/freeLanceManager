export function calculateEstimate(dueTime?: string) {
    if (!dueTime) return "No deadline";

    const due = new Date(dueTime);
    const now = new Date();
    const diff = due.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days} days remaining`;
    if (days === 0) return "Due today";
    return `${Math.abs(days)} days overdue`;
}