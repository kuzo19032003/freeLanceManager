
import { Task } from "@/types/task.type";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Typography
} from "@mui/material";
import TaskProgress from "@/components/tasks/TaskProgress";
import { formatDateFancy } from "@/utils/format-date";
import { useRouter } from "next/navigation";
import StatusChip from "../statusChip";
import useTaskMeta from "@/hooks/useTaskMeta";
export default function CardComponent({ task }: { task: Task }) {

    const {
        progress,
        status,
        color,
        bgcolor,
        priorityColor,
        priorityBgColor
    } = useTaskMeta({
        details: task?.details,
        priority: task?.priority
    })

    const startTime = formatDateFancy(task.startTime || '');
    const dueTime = formatDateFancy(task.dueTime || '');

    const router = useRouter()
    const handleOpenTask = () => {
        router.push(`/dashboard/tasks/view?id=${task.id}`)
    }

    return (

        <Card
            sx={{
                height: '34vh',
                borderRadius: 3,
                backgroundColor: 'rgb(25, 39, 52)',
                color: 'white',
                p: 0.5
            }}

        >
            <CardActionArea onClick={handleOpenTask}>
                <CardContent >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                        {/* Status and Priority */}
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mt: -1, mb: 2 }}>
                            <StatusChip
                                label={status as string}
                                color={color}
                                bgColor={bgcolor}
                                width={120}
                            />
                            <StatusChip
                                label={task?.priority as string}
                                color={priorityColor}
                                bgColor={priorityBgColor}
                                width={120}
                            />
                        </Box>

                        {/* Tiltle */}
                        <Box sx={{
                            borderRadius: 1.5,
                            borderLeft: `5px solid ${color}`,
                            paddingLeft: 2.1,
                            ml: -2.3,
                            mb: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}>
                            <Typography variant="h5" sx={{ fontSize: 16, fontWeight: 600 }}>
                                {
                                    task.title || 'Untitled Task'
                                }
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    opacity: 0.9,
                                    lineHeight: 1.5,
                                    height: 'calc(14px * 1.5 * 2)',
                                    color: 'rgb(108, 130, 145)',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}
                            >
                                {task.description || 'No description provided'}
                            </Typography>
                            <>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                                    <Typography sx={{ fontSize: 15, opacity: 0.9, color: 'rgb(108, 130, 145)' }}>
                                        Task Done :
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, opacity: 0.9 }}>
                                        {task.details.filter(d => d.isCompleted).length} / {task.details.length}
                                    </Typography>
                                </Box>
                                <TaskProgress percent={progress} color={color} />
                            </>
                        </Box>

                        {/* Time */}
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                            <Box>
                                <Typography sx={{ fontSize: 14, color: 'rgb(108, 130, 145)' }}>
                                    Start Date
                                </Typography>
                                <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
                                    {startTime || '--'}
                                </Typography>
                            </Box>


                            <Box>
                                <Typography sx={{ fontSize: 14, color: 'rgb(108, 130, 145)' }}>
                                    Due Date
                                </Typography>
                                <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
                                    {dueTime || '--'}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}