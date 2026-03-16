'use client';


import { Checkbox } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type RHFCheckBoxProps = {
    name: string;
    label?: string;
    disabled?: boolean;
    index: number,
    onToggle?: ((index: number) => void)
};


function RHFCheckBox({
    name,
    index,
    onToggle,
}: RHFCheckBoxProps) {

    const { control } = useFormContext();

    return (

        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <Checkbox
                    {...field}
                    checked={!!field.value}
                    onChange={(_, checked) => {
                        field.onChange(checked)
                        onToggle?.(index)
                    }}
                    color="info"
                />
            )}
        />

    )
}

export default RHFCheckBox;    