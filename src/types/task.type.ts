
export interface TaskPaginationResponse {
    tasks: Task[];
    total: number;
}



export interface TaskType {
    id: string;
    title: string;
    content: string;
    status: 'InProgress' | 'OverDue' | 'Completed' | 'InPreview';
    timeAble: string;
    priority: 'high' | 'medium' | 'low';
    day: string | null
}


export type TaskStatus = 'Todo' | 'InProgress' | 'Done'

export type TaskPriority = 'Low' | 'Medium' | 'High'


export interface Task {

    id: number
    createdAt: string   // ISO string
    updatedAt: string
    // user
    createdBy: string
    assignedTo?: string | null

    // content
    title: string
    description?: string

    status: TaskStatus
    priority: TaskPriority

    // time
    startTime?: string | null
    dueTime?: string | null
    completedAt?: string | null

    // detail
    detail: TaskDetail[]
}

export interface TaskDetail {
    id: number
    createdAt: string   // ISO string
    updatedAt: string
    taskId: number

    title: string
    description: string

    isCompleted: boolean

    completedBy?: number | null
    completedAt?: string | null

    order: number
}


export interface CreateTaskPayload {
    title: string
    description?: string
    priority?: TaskPriority
    assignedTo?: string

    startTime?: string
    dueTime?: string

    details?: {
        title: string
        description: string
        order?: number
    }[]
}

export interface UpdateTaskStatusPayload {
    taskId: number
    status: TaskStatus
}
