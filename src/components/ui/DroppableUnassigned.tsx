import { TaskType } from "@/types/task.type";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Box, Typography } from "@mui/material";
import DraggableTask from "./DraggableTask";

export default function DroppableUnassigned({ tasks }: { tasks: TaskType[] }) {
    const { setNodeRef } = useDroppable({ id: 'unassigned' });

    return (
        <Box
            ref={setNodeRef}
            sx={{
                minHeight: 300,
                width: 230,
                p: 2,
                bgcolor: "rgb(28, 48, 72)",
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Typography variant="h6" sx={{ mb: 1, textAlign: 'center' }}>
                Tasks
            </Typography>
            {tasks.map((task, index) => (
                <DraggableTask key={index} task={task} />
            ))}
        </Box>
    )
}