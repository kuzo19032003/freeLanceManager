import { getTaskBgColor, getTaskColor, getTaskPriorityColor } from "@/utils/task-color";
import calculateTaskProgress from "@/utils/task-progress";
import calculateTaskStatus from "@/utils/task-status";
import { useWatch } from "react-hook-form";

export default function useTaskProgress(control: any) {


    const details = useWatch({
        control,
        name: "details"
    })

    const progress = details ? calculateTaskProgress(details) : 0;
    const status = details ? calculateTaskStatus(details) : 'Complete';

    const colorProgress = getTaskColor(status)

    const taskComplete = details?.filter((d: { isCompleted: any; }) => d.isCompleted).length ?? 0;
    const taskRemaining = details?.length
        ? details.length - taskComplete
        : 0;
    return {
        progress,
        status,
        color: getTaskColor(status),
        bgcolor: getTaskBgColor(status),
        taskComplete,
        taskRemaining
    }
}