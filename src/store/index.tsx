'use client'
import { configureStore } from "@reduxjs/toolkit";
import { Provider as ProviderRedux } from "react-redux";
import authReducer from '@/store/auth/authSlice'
import { ReactNode } from "react";

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



interface ProviderProps {
    children: ReactNode;
}

export function ReduxProvider({ children }: ProviderProps) {
    return <ProviderRedux store={store}>{children}</ProviderRedux>;
}