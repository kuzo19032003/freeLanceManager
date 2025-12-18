
import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logOutThunk, refreshToken } from "./authThunk";

const initialState = {
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
        loadFromStorage: () => {
            
        },
        setAccessToken: (state,action) =>{
            state.accessToken = action.payload

        },
        logOut: (state) =>{
            state.accessToken = null
        }
    },
    extraReducers: (builder) => {
        builder
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

            .addCase(refreshToken.fulfilled,(state,action)=>{
                state.accessToken = action.payload
            })

            .addCase(logOutThunk.fulfilled,(state)=>{
                state.accessToken = null
                state.user = null
                state.permissions = []
                state.isHydrated = false
                
            })
    }

})

export const { loadFromStorage,setAccessToken,logOut } = authSlice.actions
export default authSlice.reducer