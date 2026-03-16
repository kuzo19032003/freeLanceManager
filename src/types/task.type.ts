
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
    dueTime?: string | undefined
    completedAt?: string | null

    // detail
    details: TaskDetail[]
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
    task_id: string
    title: string
    description?: string
    priority?: TaskPriority
    assignedTo?: string

    start_Time?: string
    due_time?: string


    details?: {
        title: string
    }[]
}

export interface UpdateTaskStatusPayload {
    taskId: number
    status: TaskStatus
}


export interface taskReponse {
    title: string
    description: string
    priority: TaskPriority
    assignedTo: string

    start_Time: string
    due_time: string


    details: {
        title: string
    }[]

    attachments: []
}

export interface UpdateTaskDetailStatusPayload {
    detailId: number
}
export interface TodoItem {
    title: string,
    isCompleted: boolean,
}
