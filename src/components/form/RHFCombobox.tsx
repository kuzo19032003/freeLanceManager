import { Autocomplete, TextField, SxProps, Theme } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type RHFComboBoxProps = {
    name: string;
    label?: string;
    options: string[];
    sx?: SxProps<Theme>;
    placeholder?: string;
    disabled: boolean | undefined
};

export function RHFComboBox({
    name,
    label,
    options,
    sx,
    placeholder,
    disabled
}: RHFComboBoxProps) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value, ...fieldRef }, fieldState: { error } }) => (
                <Autocomplete
                    {...fieldRef}
                    options={options}
                    value={value || null}
                    onChange={(_, newValue) => onChange(newValue)}
                    disableClearable
                    handleHomeEndKeys
                    disabled={disabled}
                    sx={sx}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            placeholder={placeholder}
                            error={!!error}
                            helperText={error?.message}
                            InputProps={{
                                ...params.InputProps,
                                style: { color: "white" },
                            }}
                            sx={{
                                '& .MuiAutocomplete-popupIndicator': {
                                    color: "rgb(146, 168, 198)",
                                },
                                '& .MuiAutocomplete-popupIndicatorOpen': {
                                    color: "rgb(146, 168, 198)",
                                },
                                 '& .MuiOutlinedInput-root.Mui-disabled': {
                                    '& fieldset': {
                                        borderColor: 'rgba(104, 96, 69, 0.5)',
                                    },
                                    '& .MuiOutlinedInput-input.Mui-disabled': {
                                        WebkitTextFillColor: 'rgba(255, 255, 255, 0.5)',
                                    }
                                },
                            }}
                        />
                    )}
                />
            )}
        />
    );
}