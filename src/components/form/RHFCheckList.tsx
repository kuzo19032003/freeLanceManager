import { Box, Button, FormHelperText, IconButton, TextField, Typography } from "@mui/material";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import AddIcon from '@mui/icons-material/Add'
import { useState } from "react";
import { useAppDispatch } from "@/hooks/useRedux";
import { updateStatusThunk } from "@/store/tasks/taskThunk";
import { TodoItem } from "@/types/task.type";
import TodoItemRow from "../ui/todoItem";
import { toast } from "react-toastify";



type RHFTextFieldProps = {
    name: string;
    label?: string;
} & React.ComponentProps<typeof TextField>;

export default function TodoChecklist({
    name,
    disabled,
    ...props
}: RHFTextFieldProps) {

    const dispatch = useAppDispatch()

    const {
        control,
        formState: { errors },
        getValues
    } = useFormContext();

    const {
        fields,
        append,
        remove,
    } = useFieldArray<{ [key: string]: TodoItem[] }>({
        control,
        name: name,
    })

    const [value, setValue] = useState<string>('')
    const error = errors[name]


    const handleAdd = async () => {

        if (!value.trim()) return;

        append({
            title: value,
            isCompleted: false
        })

        setValue('')
    }

    const toggleDone = async (index: number) => {

        const current = getValues(`details.${index}`)


        const res = await dispatch(
            updateStatusThunk({
                detailId: current.detailId,
            })
        )

        if (updateStatusThunk.fulfilled.match(res)) {
            toast.success("Update success")
        } else {
            toast.error("Update failed")
        }
    }

    return (
        <Box>
            <Box display="flex" gap={1}>
                <TextField
                    {...props}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleAdd()
                        }
                    }}
                    placeholder={"Enter Task"}
                    fullWidth
                    size="small"
                    error={!!error}
                    disabled={disabled}
                />
                {!disabled && (
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={handleAdd}
                        sx={{
                            borderRadius: '8px',
                            textTransform: 'none',
                            minWidth: 80,
                        }}
                    >
                        Add
                    </Button>

                )}
            </Box>

            {error && (
                <FormHelperText error sx={{ ml: 1 }}>
                    {error.message as string}
                </FormHelperText>
            )}

            <Box mt={2} display="flex" flexDirection="column" gap={1}>
                {fields.map((field, index) => {
                    return (
                        <TodoItemRow
                            control={control}
                            field={field}
                            index={index}
                            name={name}
                            onRemove={remove}
                            onToggle={toggleDone}
                            key={index}
                            disabled={disabled}
                        />
                    )
                })
                }
            </Box>
        </Box >
    )

}