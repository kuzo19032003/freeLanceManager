import axiosInstance from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const loginThunk = createAsyncThunk(
    'auth/login',
    async (payload, thunkAPI) => {
        try {
            const res = await axiosInstance.post('/auth/login', payload)
            return res.data
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message
                || err?.message
                || 'Login failed';
            return thunkAPI.rejectWithValue(errorMessage)
        }
    }
)

export const refreshToken = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.post('/auth/refresh')
            return res.data.access_token
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message
                || err?.message
                || 'Login failed';
            return thunkAPI.rejectWithValue(errorMessage)
        }
    }
)
export const logOutThunk = createAsyncThunk(
    'auth/logOut',
    async (_, thunkAPI) => {
        try {
            await axiosInstance.post('/auth/logOut')
            return true
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message
                || err?.message
                || 'Login failed';
            return thunkAPI.rejectWithValue(errorMessage)
        }
    }
)

export const registerThunk = createAsyncThunk(
    'auth/register',
    async (payload, thunkAPI) => {
        try {
            const res = await axiosInstance.post('/auth/register', payload)
            return res.data
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message
                || err?.message
                || 'Login failed';
            return thunkAPI.rejectWithValue(errorMessage)
        }
    }
)
