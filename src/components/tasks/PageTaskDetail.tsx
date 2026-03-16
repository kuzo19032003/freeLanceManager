import { Box, Button, Chip, Grid, Paper, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import AddIcon from '@mui/icons-material/Add'
import TodoItemRow from "../ui/todoItem";
import { useFormContext } from "react-hook-form";
import { updateStatusThunk } from "@/store/tasks/taskThunk";
import { toast } from "react-toastify";
import StatusChip from "../ui/statusChip";
import useTaskMeta from "@/hooks/useTaskMeta";
import TaskProgress from "./TaskProgress";
import useTaskProgress from "@/hooks/useTaskProgress";
import { formatDateFancy } from "@/utils/format-date";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { calculateEstimate } from "@/utils/calculateEstimate";

export default function PageTaskDetail() {



    const { loading, detail, } = useAppSelector(state => state.tasks);
    const dispatch = useAppDispatch()

    const {
        control,
        getValues
    } = useFormContext();

    const {
        taskComplete,
        taskRemaining,
        progress,
        color,
        bgcolor,
        status
    } = useTaskProgress(control)

    const {
        priorityColor,
        priorityBgColor
    } = useTaskMeta({
        details: detail?.details,
        priority: detail?.priority
    })

    const toggleDone = async (index: number) => {
        const current = getValues(`details.${index}`)
        const res = await dispatch(
            updateStatusThunk({
                detailId: current.detailId,
            })
        )
        if (updateStatusThunk.fulfilled.match(res)) {
            toast.success("Update success")
        } else {
            toast.error("Update failed")
        }
    }
    const startTime = formatDateFancy(detail?.startTime || '');
    const estimate = calculateEstimate(detail?.dueTime);


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 3, backgroundColor: 'rgb(25, 39, 52)', color: 'white' }}>

            <Box
                sx={{
                    px: 2,
                    borderLeft: `7px solid ${color}`,
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, mt: -1, mb: 2 }}>
                    <StatusChip
                        label={status as string}
                        color={color}
                        bgColor={bgcolor}
                        width={120}
                    />
                    <StatusChip
                        label={detail?.priority as string}
                        color={priorityColor}
                        bgColor={priorityBgColor}
                        width={120}
                    />
                </Box>

                <Typography variant="h5" sx={{ mb: 1, color: "rgb(255, 255, 255)" }}>
                    {detail?.title}
                </Typography>

            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, padding: 2.5, borderRadius: 2, backgroundColor: 'rgba(146, 168, 198, 0.33)' }}>

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 'bold', color: 'rgb(137, 145, 166)' }}>
                        PROJECT PROGRESS
                    </Typography>
                </Box>

                <TaskProgress percent={progress} color={color} height="180%" />

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: 12, opacity: 0.9 }}>
                        {taskComplete} tasks completed
                    </Typography>
                    <Typography sx={{ fontSize: 12, opacity: 0.9 }}>
                        {taskRemaining} tasks remaining
                    </Typography>
                </Box>
            </Box>

            <Typography sx={{ mb: 1, color: "rgb(146, 168, 198)" }}>
                DESCRIPTION
            </Typography>

            <Typography sx={{ mb: 1, color: "rgb(188, 201, 207)" }}>
                {detail?.description}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{ mb: 1, color: "rgb(146, 168, 198)" }}>
                    SUBTASKS
                </Typography>
                <Button
                    variant="text"
                    startIcon={<AddIcon />}
                    // onClick={handleAdd}
                    sx={{
                        // borderRadius: '8px',
                        textTransform: 'none',
                        minWidth: 80,
                    }}
                >
                    ADD SUBTASK
                </Button>
            </Box>

            {detail?.details.map((item, index) => (
                <TodoItemRow
                    key={item.id}
                    control={control}
                    field={item}
                    index={index}
                    name="details"
                    onToggle={toggleDone}
                    disabled={true}
                />
            ))}
            <Grid spacing={3} container sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                <Grid size={6} sx={{ padding: 3, borderRadius: 3, border: "1px solid rgb(146, 168, 198)" }}>
                    <Typography sx={{ fontSize: 13, mb: 1, color: "rgb(146, 168, 198)" }}>
                        DUE DATE
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignContent: 'center', justifyItems: 'center' }}>
                        <CalendarMonthIcon fontSize="small" /> 
                        <Typography sx={{ fontSize: 15, mb: 1, color: "white" }}>
                            {startTime}
                        </Typography>
                    </Box>
                </Grid>
                <Grid size={6} sx={{ padding: 3, borderRadius: 3, border: "1px solid rgb(146, 168, 198)" }}>
                    <Typography sx={{ fontSize: 13, mb: 1, color: "rgb(146, 168, 198)" }}>
                        ESTIMATE
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignContent: 'center', justifyItems: 'center' }}>
                        <AccessTimeIcon fontSize="small" /> 
                        <Typography sx={{ fontSize: 15, mb: 1, color: "white" }}>
                            {estimate}
                        </Typography>
                    </Box>

                </Grid>
            </Grid>
        </Box>
    )
}
