import { Box, IconButton, Typography } from "@mui/material"
import RHFCheckBox from "../form/RHFCheckBox"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useWatch } from "react-hook-form"

type TodoItemRowProps = {
    field: any
    index: number
    name: string
    disabled?: boolean
    control?: any
    onRemove?: (index: number) => void
    onToggle: (index: number) => void
}

function TodoItemRow({
    field,
    index,
    name,
    disabled,
    control,
    onRemove,
    onToggle,
}: TodoItemRowProps) {

    const isCompleted = useWatch({
        control,
        name: `${name}.${index}.isCompleted`,
    })

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            px={2}
            py={1.2}
            sx={{
                backgroundColor: 'rgba(146, 168, 198, 0.33)',
                borderRadius: '8px',
                color: 'white',
            }}
        >
            <Box display="flex" alignItems="center" gap={1.2}>
                <Typography sx={{ minWidth: '20px', color: '#94a3b8' }}>
                    0{index + 1}.
                </Typography>

                <Typography
                    sx={{
                        textDecoration: isCompleted ? 'line-through' : 'none',
                        color: isCompleted ? '#94a3b8' : 'whitesmoke',
                    }}
                >
                    {field.title}
                </Typography>
            </Box>

            {disabled ? (
                <RHFCheckBox
                    name={`${name}.${index}.isCompleted`}
                    index={index}
                    onToggle={() => onToggle(index)}
                />
            ) : (
                <IconButton
                    onClick={() => onRemove?.(index)}
                    sx={{ color: '#e11d47c8' }}
                >
                    <DeleteOutlineIcon />
                </IconButton>
            )}
        </Box>
    )
}
export default TodoItemRow