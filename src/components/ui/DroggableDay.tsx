import { Box } from "@mui/material";
import DraggableTask from "./DraggableTask";
import { useDroppable } from "@dnd-kit/core";
import { TaskType } from "@/types/task";

type WeekDay = {
    dayName: string;
    dayNumber: string;
    month: string;
    year: number;
};
export default function DroppableDay({ day, tasks }: { day: WeekDay; tasks: TaskType[] }) {

    const { setNodeRef } = useDroppable({ id: day.dayName });

    return (
        <Box
            ref={setNodeRef}
            sx={{
                minHeight: '30vh',
                overflowY: "auto",
                p: 1,
                bgcolor: "transparent",
                borderRadius: 1,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {tasks.map((task) => (
                <DraggableTask key={task.id} task={task} />
            ))}
        </Box>
    );
}