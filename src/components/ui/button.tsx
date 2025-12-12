import { Button, ButtonProps, Typography } from "@mui/material";

interface ButtonUIProps extends ButtonProps {
    name: string,
}


export default function ButtonUI({
    name,
    sx,
    ...props
}: ButtonUIProps) {

    const defaultStyleButton = {
        marginTop: '20px',
        padding: '10px',
        backgroundColor: 'rgb(19, 127, 236)',
        borderRadius: 2,
        color: 'white',
        cursor: 'pointer',
    }

    return (
        <Button
            {...props}
            sx={{
                ...defaultStyleButton,
                ...sx
            }}
        >
            <Typography variant="body1" align="center">
                {name}
            </Typography>
        </Button>
    )
}