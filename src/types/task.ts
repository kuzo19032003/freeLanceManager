export interface TaskType {
    id: string;
    title: string;
    content: string;
    status: 'InProgress' | 'OverDue' | 'Completed'| 'InPreview';
    timeAble: string;
    priority: 'high' | 'medium' | 'low';
    day: string | null
}

