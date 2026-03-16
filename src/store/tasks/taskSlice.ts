import { Task } from "@/types/task.type"
import { createSlice } from "@reduxjs/toolkit"
import { createTaskThunk, getAllTasksThunk, getTaskDetailThunk, updateStatusThunk } from "./taskThunk"

interface initialStateProps {
    tasks: Task[]
    detail: Task | null
    loading: boolean
    error: string | undefined
}

const initialState: initialStateProps = {
    tasks: [],
    detail: null,
    loading: false,
    error: undefined
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
                state.error = undefined
            })
            .addCase(getAllTasksThunk.fulfilled, (state, action) => {
                state.loading = false
                state.tasks = action.payload.tasks
            })
            .addCase(getAllTasksThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

            // Create task   
            .addCase(createTaskThunk.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(createTaskThunk.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(createTaskThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

            //Get detail
            .addCase(getTaskDetailThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(getTaskDetailThunk.fulfilled, (state, action) => {
                state.loading = false
                state.detail = action.payload.tasks
            })
            .addCase(getTaskDetailThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            //uptae status
            .addCase(updateStatusThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(updateStatusThunk.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(updateStatusThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }

})

export const { } = taskThunk.actions
export default taskThunk.reducer
