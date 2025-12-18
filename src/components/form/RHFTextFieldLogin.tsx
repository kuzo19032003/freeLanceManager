
import { TextFieldProps } from "@mui/material";
import RHFTextField from "./RHFTextField";

interface LoginTextFieldProps extends Omit<TextFieldProps, "name" | "label"> {
    name: string,
    label?: string
}

export default function LoginTextField({ name, label, ...props }: LoginTextFieldProps) {
    return (
        <RHFTextField
            name={name}
            label={label} 
            {...props}
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


                    "&:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0 100px rgb(25, 39, 52) inset",
                        WebkitTextFillColor: "rgb(80, 115, 138)",
                        caretColor: "rgb(80, 115, 138)",
                    },
                    "&:-webkit-autofill:hover": {
                        WebkitBoxShadow: "0 0 0 100px rgb(25, 39, 52) inset",
                        WebkitTextFillColor: "rgb(80, 115, 138)",
                    },
                    "&:-webkit-autofill:focus": {
                        WebkitBoxShadow: "0 0 0 100px rgb(25, 39, 52) inset",
                        WebkitTextFillColor: "rgb(80, 115, 138)",
                    },
                },
            }}
        />
    );
}
