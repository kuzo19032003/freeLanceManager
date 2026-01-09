'use client'
import { configureStore } from "@reduxjs/toolkit";
import { Provider as ProviderRedux } from "react-redux";
import authReducer from '@/store/auth/authSlice'
import taskReducer from '@/store/tasks/taskSlice'

import { ReactNode } from "react";
import { injectStore } from "@/lib/axios";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: taskReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

injectStore(store)

interface ProviderProps {
    children: ReactNode;
}

export function ReduxProvider({ children }: ProviderProps) {
    return <ProviderRedux store={store}>{children}</ProviderRedux>;
}