'use client';
import TasksTable from "@/components/tasks/TaskTable";
import { Box, Divider, Typography } from "@mui/material";

export default function TasksPage() {
  

    return (
        <Box sx={{display:'flex',flexDirection:'column',gap:3}}>
            <Typography variant="h4" gutterBottom>
                My Tasks
            </Typography>
            <Divider sx={{ backgroundColor: 'rgb(56, 75, 98)', ml: 0 }} />
            <TasksTable />
        </Box>
    );
}