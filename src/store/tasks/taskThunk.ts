import axiosInstance from "@/lib/axios";
import { TaskPaginationResponse } from "@/types/task.type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { log } from "console";

export const getAllTasksThunk = createAsyncThunk(
    'task/getAll',
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get<TaskPaginationResponse>('/task/all')
            console.log('res', res);
            return res.data
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message
                || err?.message
                || 'Get tasks failed';
            return thunkAPI.rejectWithValue(errorMessage)
        }
    }
);