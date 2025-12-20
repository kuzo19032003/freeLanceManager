"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";
import { getProfileThunk, refreshToken } from "@/store/auth/authThunk";


const theme = createTheme({
    palette: {
        mode: "light",
    },
});

export function Providers({ children }: { children: React.ReactNode }) {

    const dispatch = useAppDispatch()
    const { isHydrated } = useAppSelector(state => state.auth)

    useEffect(() => {
        if (!isHydrated) {
            dispatch(refreshToken())
            dispatch(getProfileThunk())
        }
    }, [])


    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}
