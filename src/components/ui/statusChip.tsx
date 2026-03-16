import { Chip } from "@mui/material";

type StatusChipProps = {
    label: string;
    color?: string;
    bgColor?: string;
    width?: number;
};

export default function StatusChip({
    label,
    color,
    bgColor,
    width
}: StatusChipProps) {
    return (
        <Chip
            label={label}
            sx={{
                fontSize: 15,
                opacity: 0.9,
                width,
                color,
                backgroundColor: bgColor,
            }}
        />
    );
}