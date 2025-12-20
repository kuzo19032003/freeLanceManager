'use client'

import FormProvider from "@/components/form/RHFProvider";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import { loginSchema, loginSchemaType } from "@/schemas/login.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginTextField from "@/components/form/RHFTextFieldLogin";
import RHFPasswordField from "@/components/form/RHFPasswordField";
import ButtonUI from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { loginThunk } from "@/store/auth/authThunk";
import { toast } from "react-toastify";
import Loading from "@/loading";
import { useState } from "react";

export default function LoginForm() {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading } = useAppSelector(state => state.auth);

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const methods = useForm<loginSchemaType>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: ''
        }
    });



    const handleSubmit = async (data: any) => {
        setIsLoading(true)
        try {
            const result = await dispatch(loginThunk(data))

            if (loginThunk.fulfilled.match(result)) {
                router.push('/')
                toast.success("Đăng nhập thành công");
            } else {
                toast.error("Đăng nhập thất bại");
            }
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', bgcolor: 'rgb(16, 24, 34)', height: '100vh' }}>
            {
                !loading || isLoading && (
                    <Loading />
                )
            }
            <Box>
                {/* Header */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center', paddingTop: '10px', gap: 1 }}>
                    <LayersOutlinedIcon sx={{ color: 'rgb(19, 123, 238)', fontSize: 55 }} />
                    <Typography variant="h5" sx={{ color: 'white' }}>
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgb(119, 127, 135)' }}>
                        Log in to manage your freelance account
                    </Typography>
                </Box>

                {/* Form */}
                <FormProvider methods={methods} onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '400px', margin: '0 auto', paddingTop: '30px' }}>

                        <Typography variant="body1" sx={{ color: 'white' }}>
                            Email Address
                        </Typography>

                        <LoginTextField name="email" />

                        <Typography variant="body1" sx={{ color: 'white' }}>
                            Password
                        </Typography>

                        <RHFPasswordField name="password" />

                        <Typography
                            component={Link}
                            href="#"
                            align="right"
                            sx={{
                                borderRadius: 2,
                                color: 'rgb(19, 127, 236)',
                                cursor: 'pointer',
                                border: 'none',
                                textDecoration: 'underline',
                            }}
                        >
                            Forgot Password?
                        </Typography>
                        <ButtonUI
                            name="login"
                            type="submit"
                            disabled={isLoading || loading}
                        />

                    </Box>
                </FormProvider>
            </Box>

            {/* Register */}
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingBottom: '20px', gap: 1 }}>
                <Typography variant="body1" sx={{ color: 'white' }}>
                    Don't have an account?
                </Typography>
                <Typography
                    component={Link}
                    href="/register"
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
                    Sign Up
                </Typography>
            </Box>

        </Box>
    )
}