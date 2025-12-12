'use client'

import { IconButton, InputAdornment, TextFieldProps } from "@mui/material";
import RHFTextField from "./RHFTextField";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface LoginTextFieldProps extends Omit<TextFieldProps, "name" | "label"> {
    name: string,
}

export default function RHFPasswordField({ name, ...props }: LoginTextFieldProps) {

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    return (
        <RHFTextField
            name={name}
            label=""
            type={showPassword ? "text" : "password"}
            {...props}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visible"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            sx={{
                                color: "rgb(80, 115, 138)",
                                '&:hover': {
                                    backgroundColor: 'rgba(80, 115, 138, 0.1)',
                                }
                            }}
                        >
                            {!showPassword ? (
                                <VisibilityOff sx={{ color: "rgb(80, 115, 138)" }} />
                            ) : (
                                <Visibility sx={{ color: "rgb(80, 115, 138)" }} />
                            )}
                        </IconButton>
                    </InputAdornment >
                )
            }}
            sx={{
                backgroundColor: 'rgb(25, 39, 52)',
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": { borderColor: "rgb(80, 115, 138)" },
                    "&:hover fieldset": { borderColor: "rgb(80, 115, 138)" },
                    "&.Mui-error fieldset": { borderColor: "red" },
                },
                "& .MuiOutlinedInput-input": {
                    color: "rgb(80, 115, 138)",
                },
            }}
        />
    )
}
