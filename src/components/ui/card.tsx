import { TaskType } from "@/types/task";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";

import MoreVertIcon from '@mui/icons-material/MoreVert';
export default function CardComponent({ task }: { task: TaskType }) {

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
            sx={{
                height: '20vh',
                mb: 2,
                borderRadius: 3,
                backgroundColor: 'rgb(25, 39, 52)',
                color: 'white',
                p: 0.5
            }}
        >
            <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: 20,
                            mb: 0.2
                        }}>
                        {
                            task.title
                        }
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 15,
                            opacity: 0.9,
                            color: 'rgb(108, 130, 145)'
                        }}>
                        {
                            task.content
                        }
                    </Typography>
                    <Chip
                        label={task.status}
                        sx={{
                            fontSize: 15,
                            opacity: 0.9,
                            color: statusColor[task.status] || 'rgb(76, 138, 205)',
                            backgroundColor: statusBgColor[task.status] || 'rgb(28, 48, 72)',
                        }}>

                    </Chip>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <MoreVertIcon sx={{ ml: 5 }} />
                    <Typography
                        sx={{
                            fontSize: 15,
                            opacity: 0.9,
                            color: 'rgb(108, 130, 145)'
                        }}>
                        {
                            "Due : " + task.timeAble
                        }
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}