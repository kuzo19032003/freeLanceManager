import { Task, TaskType } from "@/types/task.type";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";

import MoreVertIcon from '@mui/icons-material/MoreVert';
import calculateTaskProgress from "@/utils/task-progress";
import { getTaskBgColor, getTaskColor, getTaskPriorityBgColor, getTaskPriorityColor } from "@/utils/task-color";
import { get } from "http";
import TaskProgress from "@/components/tasks/TaskProgress";
import calculateTaskStatus from "@/utils/task-status";
import { formatDateFancy } from "@/utils/format-date";
export default function CardComponent({ task }: { task: Task }) {

    const progress = calculateTaskProgress(task.detail);
    const status = calculateTaskStatus(task.detail);

    const color = getTaskColor(status);
    const bgcolor = getTaskBgColor(status);

    const priorityColor = getTaskPriorityColor(task.priority);
    const priorityBgColor = getTaskPriorityBgColor(task.priority);

    const startTime = formatDateFancy(task.startTime || '');
    const dueTime = formatDateFancy(task.dueTime || '');

    return (
        <Card
            sx={{
                height: '35vh',
                mb: 2,
                borderRadius: 3,
                backgroundColor: 'rgb(25, 39, 52)',
                color: 'white',
                p: 0.5
            }}
        >
            <CardContent >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

                    {/* Status and Priority */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2,mt: -1, mb: 1 }}>
                        <Chip
                            label={status}
                            sx={{
                                fontSize: 15,
                                opacity: 0.9,
                                width: 130,
                                color: color,
                                backgroundColor: bgcolor,
                            }}>
                        </Chip>
                        <Chip
                            label={task.priority}
                            sx={{
                                fontSize: 15,
                                opacity: 0.9,
                                width: 130,
                                color: priorityColor,
                                backgroundColor: priorityBgColor,
                            }}>
                        </Chip>
                    </Box>

                    {/* Tiltle */}
                    <Box sx={{ borderRadius: 1, borderLeft: `5px solid ${color}`, paddingLeft: 2, ml: -2.3, mb: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="h5" sx={{ fontSize: 20 }}>
                            {
                                task.title || 'Untitled Task'
                            }
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: 15,
                                opacity: 0.9,
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
                                    {task.detail.filter(d => d.isCompleted).length} / {task.detail.length}
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
        </Card>
    )
}