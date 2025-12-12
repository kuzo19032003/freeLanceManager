import { TaskType } from "@/types/task";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, Chip, Paper, Typography } from "@mui/material";

export default function DraggableTask({ task }: { task: TaskType }) {

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task.id });

    const statusColor = {
        InProgress: 'rgb(76, 138, 205)',
        OverDue: 'rgb(201, 3, 33)',
        Completed: 'rgb(87, 192, 173)',
        InPreview: 'rgb(139, 92, 219)'
    }
    const statusBgColor = {
        InProgress: 'rgb(28, 48, 72)',
        OverDue: 'rgba(77, 24, 41, 1)',
        Completed: 'rgb(31, 70, 75)',
        InPreview: 'rgb(49, 42, 84)'
    }


    return (
        <Card
            component={Paper}
            elevation={3}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            sx={{
                mb: 1,
                justifyContent: "flex-start",
                cursor: "grab",
                opacity: isDragging ? 0.4 : 1,
                color: statusColor[task.status] || 'rgb(76, 138, 205)',
                backgroundColor: statusBgColor[task.status] || 'rgb(28, 48, 72)',
                fontSize: 15,
                fontWeight: 'bold',
                height: 55,
                borderRadius: 3,
            }}
        >
            <CardContent sx={{ p: 1.5 }}>
                <Typography
                    sx={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        lineHeight: 1.2,
                        mb: 0.5
                    }}>
                    {
                        task.title
                    }
                </Typography>

                <Typography
                    sx={{
                        fontSize: 13,
                        opacity: 0.9,
                        lineHeight: 1

                    }}>
                    {
                        task.content
                    }
                </Typography>
            </CardContent>
        </Card>
    )
}