
import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "./authThunk";

const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    refresh: null,
    permissions: [],
    loading: false,
    isHydrated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loadFromStorage: () => {
            
        },
        
        logOut: () =>{
            
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false
                state.accessToken = action.payload.accessToken
            })
            .addCase(loginThunk.rejected, (state) => {
                state.loading = false
            })
    }

})

export const { loadFromStorage } = authSlice.actions
export default authSlice.reducer