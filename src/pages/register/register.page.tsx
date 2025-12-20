'use client'

import FormProvider from "@/components/form/RHFProvider";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import { registerSchema, registerSchemaType } from "@/schemas/login.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginTextField from "@/components/form/RHFTextFieldLogin";
import RHFPasswordField from "@/components/form/RHFPasswordField";
import ButtonUI from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {  registerThunk } from "@/store/auth/authThunk";
import { toast } from "react-toastify";
import Loading from "@/loading";
import { useState } from "react";

export default function Register() {

    const dispatch = useAppDispatch();
    const router = useRouter();
    
    const { loading } = useAppSelector(state => state.auth);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const methods = useForm<registerSchemaType>({
        resolver: zodResolver(registerSchema),
        mode: 'onChange',
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const handleSubmit = async (data: any) => {
        setIsLoading(true)
        try {
            const result = await dispatch(registerThunk(data))

            if (registerThunk.fulfilled.match(result)) {
                router.push('/login')
                toast.success("Đăng ký thành công");
            } else {
                toast.error("Đăng ký thất bại");
            }
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', bgcolor: 'rgb(16, 24, 34)', height: '100vh' }}>
            {
                loading || isLoading && (
                    <Loading />
                )
            }
            <Box>
                {/* Header */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center', paddingTop: '5px', gap: 1 }}>
                    <LayersOutlinedIcon sx={{ color: 'rgb(19, 123, 238)', fontSize: 55 }} />
                    <Typography variant="h5" sx={{ color: 'white' }}>
                        Create an Account
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgb(119, 127, 135)' }}>
                        Get started with managing your freelance business.
                    </Typography>
                </Box>

                {/* Form */}
                <FormProvider methods={methods} onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.3, width: '400px', margin: '0 auto', paddingTop: '5px' }}>

                        {/* Full name */}
                        <Typography variant="body1" sx={{ color: 'white' }}>
                            Full Name
                        </Typography>
                        <LoginTextField name="fullName" placeholder="Enter your full name" />

                        {/* Email */}
                        <Typography variant="body1" sx={{ color: 'white' }}>
                            Email Address
                        </Typography>
                        <LoginTextField name="email" placeholder="You@example.com" />

                        {/*Password */}
                        <Typography variant="body1" sx={{ color: 'white' }}>
                            Password
                        </Typography>
                        <RHFPasswordField name="password" placeholder="Create a password" />

                        {/* Forget Password */}
                        <Typography variant="body1" sx={{ color: 'white' }}>
                            Confirm Password
                        </Typography>
                        <RHFPasswordField name="confirmPassword" placeholder="Confirm your account" />


                        <ButtonUI
                            name="Sign Up"
                            type="submit"
                            disabled={isLoading || loading}
                        />

                    </Box>
                </FormProvider>
            </Box>

            {/* login */}
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingBottom: '20px', gap: 1 }}>
                <Typography variant="body1" sx={{ color: 'white' }}>
                    Already have an account?
                </Typography>
                <Typography
                    component={Link}
                    href="/login"
                    align="right"
                    sx={{
                        borderRadius: 2,
                        color: 'rgb(19, 127, 236)',
                        cursor: 'pointer',
                        border: 'none',
                        textDecoration: 'underline',
                        fontSize: 16
                    }}
                >
                    Log In
                </Typography>
            </Box>

        </Box>
    )
}