import { TaskDetail } from "@/types/task.type";

export default function calculateTaskProgress(taskDetail: TaskDetail[]): number {
    if (!taskDetail || taskDetail.length === 0) return 0
    const completed = taskDetail.filter(detail => detail.isCompleted).length
    console.log('taskDetail', completed);
    return Math.round((completed / taskDetail.length) * 100)
}