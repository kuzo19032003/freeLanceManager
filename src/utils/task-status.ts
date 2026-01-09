import { TaskDetail } from "@/types/task.type";

export default function calculateTaskStatus(taskDetail: TaskDetail[]): string {   
    if (!taskDetail || taskDetail.length === 0) return 'No Details';
    
    const completed = taskDetail.filter(detail => detail.isCompleted).length;
    if (completed === taskDetail.length) return 'Completed';
    if (completed > 0) return 'In progress';

    return 'Pending';
}