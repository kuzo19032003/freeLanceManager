import { Task, TaskDetail } from "@/types/task.type";
import { getTaskBgColor, getTaskColor, getTaskPriorityBgColor, getTaskPriorityColor } from "@/utils/task-color";
import calculateTaskProgress from "@/utils/task-progress";
import calculateTaskStatus from "@/utils/task-status";
import { useMemo } from "react";

type useTaskMetaProps = {
    details: TaskDetail[] | undefined
    priority: string | undefined
}


export default function useTaskMeta({ details, priority }: useTaskMetaProps) {

    return useMemo(() => {

        const progress = details ? calculateTaskProgress(details) : 0;
        const status = details ? calculateTaskStatus(details) : 'Complete';
        return {
            progress,
            status,
            color: getTaskColor(status),
            bgcolor: getTaskBgColor(status),
            priorityColor: getTaskPriorityColor(priority || 'low'),
            priorityBgColor: getTaskPriorityBgColor(priority || 'low')
        }

    }, [details, priority])


}
