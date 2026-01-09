import { Task } from "@/types/task.type"
import { createSlice } from "@reduxjs/toolkit"
import { getAllTasksThunk } from "./taskThunk"

interface initialStateProps {
    tasks: Task[]
    loading: boolean
    error: string | null
}

const initialState: initialStateProps = {
    tasks: [],
    loading: false,
    error: null
}

const taskThunk = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get all tasks   
            .addCase(getAllTasksThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getAllTasksThunk.fulfilled, (state, action) => {
                state.loading = false
                state.tasks = action.payload.tasks
            })
            .addCase(getAllTasksThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
        }
    
})

export const {} = taskThunk.actions
export default taskThunk.reducer
