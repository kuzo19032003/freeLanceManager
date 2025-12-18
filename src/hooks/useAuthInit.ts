'use client'

import { useEffect } from "react"
import { useAppDispatch } from "./useRedux"
import { refreshToken } from "@/store/auth/authThunk"

export default function useAuthInit() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(refreshToken())
    }, [])
}