'use client';
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type RHFTextFieldProps = {
    name: string;
    label?: string;
} & React.ComponentProps<typeof TextField>;


function RHFTextField({ name, label, ...props }: RHFTextFieldProps) {
    const {
        control
    } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <TextField
                    {...field}
                    label={label}
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error ? fieldState.error.message : null}
                    {...props}
                />
            )}
        />

    )
}
export default RHFTextField;    