'use client';
import { Controller, useFormContext } from "react-hook-form";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { vi } from 'date-fns/locale/vi';
import { Box, SxProps, Theme } from "@mui/material";

type RHFDatePickerProps = {
    name: string;
    label?: string;
    sx?: SxProps<Theme>;
    color?: string
    disable: boolean | undefined
};

export default function RHFDatePicker({
    name,
    sx,
    color = 'white',
    disable
}: RHFDatePickerProps) {
    const { control } = useFormContext();

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
            <Box sx={{
                width: '100%',
                "& *": {
                    color: `${color} !important`,
                    WebkitTextFillColor: `${color} !important`,
                },

                "& input::placeholder": {
                    color: `${color} !important`,
                    opacity: 1,
                    WebkitTextFillColor: `${color} !important`,
                },
                ...sx
            }}>
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
                        <DatePicker
                            {...field}
                            format="dd/MM/yyyy"
                            value={value ? new Date(value) : null}
                            onChange={(date) => {
                                onChange(date ? date.toISOString() : null);
                            }}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    error: !!error,
                                    helperText: error?.message,
                                },
                                openPickerButton: {
                                    sx: { color: `${color} !important` }
                                }
                            }}
                            disabled={disable}
                        />
                    )}
                />
            </Box>
        </LocalizationProvider>
    );
}