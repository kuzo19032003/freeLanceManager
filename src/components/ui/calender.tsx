'use client'
import { TaskType } from "@/types/task";
import {
    Box,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import DraggableTask from "./DraggableTask";
import DraggableUnassigned from "./DroppableUnassigned";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import DraggableDay from "./DroggableDay";
import CardComponent from "./card";


function getCurrentWeek() {
    const currentDate = new Date();
    const currentDateIndex = currentDate.getDay()

    const mondayOffSet = currentDateIndex === 0 ? -6 : 1 - currentDateIndex

    const monday = new Date(currentDate)
    monday.setDate(currentDate.getDate() + mondayOffSet)

    const weeks: Array<{ dayName: string, dayNumber: string, month: string, year: number }> = []

    const weekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' })
    const dayFormatter = new Intl.DateTimeFormat('en-US', { day: '2-digit' })
    const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' })


    for (let i = 0; i < 7; i++) {
        const d = new Date(monday)
        d.setDate(monday.getDate() + i)
        weeks.push({
            dayName: weekdayFormatter.format(d),
            dayNumber: dayFormatter.format(d),
            month: monthFormatter.format(d),
            year: d.getFullYear()
        })
    }

    return weeks
}


export default function Calender() {
    const weekDays = useMemo(() => getCurrentWeek(), [])


    const priorityOrder = {
        high: 1,
        medium: 2,
        low: 3
    }
    

    const initialTasks: TaskType[] = [
        { id: "a1", title: 'Ăn cơm', priority: 'low', status: 'Completed', timeAble: 'now', content: "Prepare report", day: null },
        { id: "a2", title: 'đi ngủ', priority: 'medium', status: 'OverDue', timeAble: 'now', content: "Prepare report", day: null },
        { id: "a3", title: 'xem phim', priority: 'high', status: 'InProgress', timeAble: 'now', content: "Prepare report", day: null },
        { id: "a4", title: 'xem phim', priority: 'high', status: 'InPreview', timeAble: 'now', content: "Prepare report", day: null },
    ]


    const [tasks, setTasks] = useState<TaskType[]>(initialTasks)
    const [isActiveTask, setIsActiveTask] = useState<TaskType | null>(null)
    const [isSelectDay, setIsSelectday] = useState<string | null>(null)

    const getTasksByDay = (day: string | null) => tasks
        .filter(d => d.day === day)
        .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])


    // Sensors là nguồn phát hiện thao tác kéo.
    const sensors = useSensors(useSensor(PointerSensor))

    const handleDragStart = (event: any) => {
        const taskActive = tasks.find((t) => t.id === event.active.id) || null
        setIsActiveTask(taskActive)
    }

    const handleDragEnd = (event: any) => {
        const { active, over } = event

        if (!over) return;

        const target = over.id === 'unassigned' ? null : over.id


        setTasks((prev) =>
            prev.map(t => t.id === active.id ? { ...t, day: target } : t)
        )
        setIsActiveTask(null)
    }



    return (
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <Box sx={{ display: "flex", gap: 2, p: 2, minHeight: '50vh', boxSizing: "border-box" }}>
                <DraggableUnassigned tasks={getTasksByDay(null)} />

                <TableContainer sx={{ backgroundColor: 'transparent', flex: 1 }} >
                    <Table>
                        <TableHead>
                            <TableRow >
                                {weekDays.map((day, index) => (
                                    <TableCell
                                        key={index}
                                        onClick={() => setIsSelectday(day.dayName)}
                                        align="center"
                                        sx={{
                                            borderRight: "1px solid rgb(121, 158, 203)",
                                            borderBottom: "1px solid rgb(121, 158, 203)",
                                            color: 'rgb(200, 213, 225)',
                                            py: 2,
                                            '&:first-of-type': { borderLeft: 'none' },
                                            '&:last-of-type': { borderRight: 'none' },
                                        }}
                                    >
                                        <Box>
                                            <Typography sx={{ fontSize: 16, color: 'rgb(119, 151, 175)' }}>
                                                {day.dayName}
                                            </Typography>

                                            <Typography sx={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>
                                                {day.dayNumber}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <TableRow>
                                {weekDays.map((day, index) => (
                                    <TableCell
                                        key={index}
                                        sx={{
                                            minHeight: '30vh',
                                            border: "1px solid rgb(121, 158, 203)",
                                            borderBottom: "transparent",
                                            p: 1,
                                            verticalAlign: "top",
                                            '&:first-of-type': { borderLeft: 'none' },
                                            '&:last-of-type': { borderRight: 'none' },
                                        }}
                                    >
                                        <DraggableDay
                                            day={day}
                                            tasks={getTasksByDay(day.dayName)}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <DragOverlay>
                {
                    isActiveTask && (
                        <DraggableTask task={isActiveTask} />
                    )}
            </DragOverlay>

            {isSelectDay && (
                <Box sx={{ mt: 3, p: 2, borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Tasks of {isSelectDay}
                    </Typography>
                    {
                        getTasksByDay(isSelectDay).length === 0 ? (
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                No tasks in {isSelectDay}
                            </Typography>
                        ) : (
                            <>
                                {
                                    getTasksByDay(isSelectDay).map((task, index) => (
                                        <Box key={index}>
                                            <CardComponent task={task} />
                                        </Box>
                                    ))
                                }
                            </>
                        )}

                </Box>
            )}
        </DndContext>

    )
}