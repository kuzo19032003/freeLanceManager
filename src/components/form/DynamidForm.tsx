
import { Grid, TextField, Typography } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import RHFTextField from "./RHFTextField";
import RHFCheckList from "./RHFCheckList";
import RHFDatePicker from "./RHFDate"


import { RHFComboBox } from "./RHFCombobox";
import RHFUploadFile from "./RHFUploadFile";
import RHFAutoCompleteAsync from "./RHFAsync";


type DynamicFormProps = {
    formConfig: any[]
    control: Control<any>
    readonly?: boolean
}


export default function DynamicForm({ formConfig, control, readonly }: DynamicFormProps) {

    return (
        <>
            {
                formConfig.map((field: any, key: number) => (
                    <Grid size={field.size} key={key}>
                        <Typography sx={{ mb: 1, color: "rgb(146, 168, 198)" }}>
                            {field.label}
                        </Typography>
                        <Controller
                            name={field.name}
                            control={control}
                            render={({ field: controllerField, fieldState: { error } }) => {
                                switch (field.type) {
                                    case 'textarea':
                                        return (
                                            <RHFTextField
                                                {...controllerField}
                                                fullWidth
                                                multiline
                                                rows={4}
                                                placeholder={field.placeholder || ''}
                                                sx={{
                                                    border: '1px solid rgb(69, 83, 104)',
                                                    '& .MuiOutlinedInput-root.Mui-disabled': {
                                                        '& fieldset': {
                                                            borderColor: 'rgba(104, 96, 69, 0.5)',
                                                        },
                                                        '& .MuiOutlinedInput-input.Mui-disabled': {
                                                            WebkitTextFillColor: 'rgba(255, 255, 255, 0.5)',
                                                        }
                                                    },
                                                }}
                                                inputProps={{
                                                    style: { color: 'white' },
                                                }}
                                                error={!!error}
                                                helperText={error?.message}
                                                disabled={readonly}
                                            />
                                        )
                                    case 'checklist':
                                        return (
                                            <RHFCheckList
                                                {...controllerField}
                                                fullWidth
                                                multiline
                                                rows={1.5}
                                                placeholder={field.placeholder || ''}
                                                sx={{ border: '1px solid rgb(69, 83, 104)' }}
                                                inputProps={{
                                                    style: { color: 'white' },
                                                }}
                                                disabled={readonly}

                                            />
                                        )
                                    case 'combobox':
                                        return (
                                            <RHFComboBox
                                                name={field.name}
                                                options={field.options}
                                                sx={{ border: '1px solid rgb(69, 83, 104)' }}
                                                disabled={readonly}
                                            />
                                        )
                                    case 'date':
                                        return (
                                            <RHFDatePicker
                                                name={field.name}
                                                label={field.label}
                                                sx={{ border: '1px solid rgb(69, 83, 104)', color: 'white ' }}
                                                disable={readonly}

                                            />
                                        )
                                    case 'uploadfile':
                                        return (
                                            <RHFUploadFile
                                                name={field.name}
                                                sx={{ border: '1px solid rgb(69, 83, 104)', color: 'white' }}

                                            />
                                        )
                                    case 'autocomplete-async':
                                        return (
                                            <RHFAutoCompleteAsync
                                                name={field.name}
                                                fetchOptions={field.fetchOptions}
                                            />
                                        )

                                    default:
                                        return (
                                            <RHFTextField
                                                {...controllerField}
                                                fullWidth
                                                placeholder={field.placeholder || ''}
                                                sx={{
                                                    border: '1px solid rgb(69, 83, 104)',
                                                    '& input::-webkit-calendar-picker-indicator': {
                                                        filter: 'invert(1)',
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
                                                inputProps={{
                                                    style: { color: 'white' },
                                                }}
                                                type={field.type || 'text'}
                                                error={!!error}
                                                helperText={error?.message}
                                                disabled={readonly}

                                            />
                                        )
                                }
                            }}
                        />
                    </Grid >
                ))
            }
        </>
    )
}