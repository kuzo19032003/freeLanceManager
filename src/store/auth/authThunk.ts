import axiosInstance from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface LoginCredentials {
    email: string
    password: string
}


export const loginThunk = createAsyncThunk(
    'auth/login',
    async (payload, thunkAPI) => {
        try {
            const res = await axiosInstance.post('/login', payload)
            return res.data
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message
                || err?.message
                || 'Login failed';
            return thunkAPI.rejectWithValue(errorMessage)
        }
    }
)   
