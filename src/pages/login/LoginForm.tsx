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

export default function LoginForm() {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading,accessToken } = useAppSelector(state => state.auth);

    const methods = useForm<loginSchemaType>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    console.log(accessToken)

    const handleSubmit = async (data: any) => {
        const result = await dispatch(loginThunk(data))
        if (loginThunk.fulfilled.match(result)) {
            router.push('/')
            toast.success("Đăng nhập thành công");
        } else {
            toast.error("Đăng nhập thất bại");
        }
    }
    
    return (
        <Box sx={{ bgcolor: 'rgb(16, 24, 34)', height: '100vh' }}>

            {/* Header */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center', paddingTop: '20px', gap: 2 }}>
                <LayersOutlinedIcon sx={{ color: 'rgb(19, 123, 238)', fontSize: 70 }} />
                <Typography variant="h4" sx={{ color: 'white' }}>
                    Welcome Back
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgb(119, 127, 135)' }}>
                    Log in to manage your freelance account
                </Typography>
            </Box>

            {/* Form */}
            <FormProvider methods={methods} onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '450px', margin: '0 auto', paddingTop: '20px' }}>

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
                    />

                </Box>
            </FormProvider>

        </Box>
    )
}