'use client';
import TasksTable from "@/components/tasks/TaskTable";
import CardComponent from "@/components/ui/card/taskDetailCard";
import CardDetailComponent from "@/components/ui/card/taskDetailCard";
import { useAppSelector } from "@/hooks/useRedux";
import { getAllTasksThunk } from "@/store/tasks/taskThunk";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TasksPage() {
    const dispatch = useDispatch();
    const { tasks } = useAppSelector(state => state.tasks);

    useEffect(() => {
        dispatch(getAllTasksThunk() as any);
    }, [])



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
                <Typography variant="h4" gutterBottom>
                    My Tasks
                </Typography>
            </Box>
            <Grid container spacing={3}>
                {
                    tasks.length > 0
                        ? (
                            tasks.map((i, index) => (
                                <Grid size={4} key={index}>
                                    <CardComponent task={i} />
                                </Grid>
                            ))

                        )
                        : (
                            <Typography variant="body1" gutterBottom>
                                No tasks available.
                            </Typography>
                        )
                }
            </Grid>


        </Box>
    );
}