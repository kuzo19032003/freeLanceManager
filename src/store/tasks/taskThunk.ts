import axiosInstance from "@/lib/axios";
import { CreateTaskPayload, TaskPaginationResponse, taskReponse, UpdateTaskDetailStatusPayload } from "@/types/task.type";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllTasksThunk = createAsyncThunk(
    'task/getAll',
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get<TaskPaginationResponse>('/task/all')
            return res.data
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message
                || err?.message
                || 'Get tasks failed';
            return thunkAPI.rejectWithValue(errorMessage)
        }
    }
);
export const createTaskThunk = createAsyncThunk(
    'task/create',
    async (payload, thunkAPI) => {
      
        try {
            const res = await axiosInstance.post<CreateTaskPayload>('/task/create', payload)
            console.log('res', payload);
            return res.data
        } catch (err: any) {
            console.log(err)
            const errorMessage = err?.response?.data?.message
                || err?.message
                || 'Get tasks failed';
            return thunkAPI.rejectWithValue(errorMessage)
        }
    }
);
export const uploadFileThunk = createAsyncThunk<
    taskReponse,
    { taskId: string, formData: FormData }
>(
    'task/attachments',
    async ({ taskId, formData }, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                `/task/${taskId}/attachments`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            )
            return res.data
        } catch (err: any) {
            console.log(err)
            const errorMessage = err?.response?.data?.message
                || err?.message
                || 'Get tasks failed';
            return thunkAPI.rejectWithValue(errorMessage)
        }
    }
);
export const getTaskDetailThunk = createAsyncThunk<
    any,
    number,
    { rejectValue: string }
>(
    'task/getDetail',
    async (taskID, thunkAPI) => {

        try {
            const res = await axiosInstance.get(
                `/task/detail/${taskID}`
            )

            return res.data
        } catch (err: any) {

            const errorMessage =
                err?.response?.data?.message ||
                err?.message ||
                'Get task detail failed'
            return thunkAPI.rejectWithValue(errorMessage)
        }
    }
)
export const updateStatusThunk = createAsyncThunk<
    any,
    UpdateTaskDetailStatusPayload,
    { rejectValue: string }
>(
    'task/updateStatus',
    async (payload, thunkAPI) => {
        console.log(payload)
        try {
            const res = await axiosInstance.put('/task/detail/complete', payload)
            return res.data
        } catch (err: any) {
            console.log(err)
            const errorMessage = err?.response?.data?.message
                || err?.message
                || 'Get tasks failed';
            return thunkAPI.rejectWithValue(errorMessage)
        }
    }
);