
import { createSlice } from "@reduxjs/toolkit";
import { getProfileThunk, loginThunk, logOutThunk, refreshToken, registerThunk } from "./authThunk";
import { User } from "@/types/auth.type";

interface initialStateProps {
    user: User | null
    accessToken: string | null
    permissions: string[] 
    loading: boolean
    isHydrated: boolean
}

const initialState: initialStateProps = {
    user: null,
    accessToken: null,
    permissions: [],
    loading: false,
    isHydrated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            //Login
            .addCase(loginThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false
                state.accessToken = action.payload.access_token
            })
            .addCase(loginThunk.rejected, (state) => {
                state.loading = false
            })

            // refreshToken
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.accessToken = action.payload.access_token
                state.isHydrated = true

            })
            .addCase(refreshToken.rejected, (state) => {
                state.isHydrated = true
            })

            //Log out
            .addCase(logOutThunk.fulfilled, (state) => {
                state.accessToken = null
                state.user = null
                state.permissions = []
                state.isHydrated = false
            })

            //Register
            .addCase(registerThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(registerThunk.rejected, (state) => {
                state.loading = false
            })

            // getProfile
            .addCase(getProfileThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(getProfileThunk.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(getProfileThunk.rejected, (state) => {
                state.loading = false
            })
    }

})

export const { setAccessToken } = authSlice.actions
export default authSlice.reducer