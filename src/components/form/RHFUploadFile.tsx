import { X } from "@mui/icons-material";
import { Box, IconButton, SxProps, Table, TableBody, TableCell, TableContainer, TableRow, Theme, Typography } from "@mui/material";
import { Control, Controller, useFormContext } from "react-hook-form";
import AttachmentIcon from '@mui/icons-material/Attachment';


interface RHFUploadFileProps {
    name: string;
    accept?: string;
    multiple?: boolean,
    sx?: SxProps<Theme>;

}

export default function RHFUploadFile({
    name,
    accept,
    multiple = true,
    sx
}: RHFUploadFileProps) {

    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value = [], onChange } }) => {

                const handleAddFiles = (fileList: FileList | null) => {
                    if (!fileList) return;
                    onChange([...value, ...Array.from(fileList)]);
                };

                const handleRemoveFile = (index: number) => {
                    const newFiles = value.filter((_: File, i: number) => i !== index);
                    onChange(newFiles);
                };

                return (
                    <TableContainer>
                        <Table>
                            <TableBody >
                                <TableRow >
                                    <TableCell sx={{ width: '80vw', border: '1px solid rgb(69, 83, 104)' }}>
                                        {value.length > 0 ? (
                                            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                                                {value.map((file: File, index: number) => {

                                                    const isImage = file.type.startsWith("image/");
                                                    const previewUrl = URL.createObjectURL(file);

                                                    return (
                                                        <Box
                                                            key={index}
                                                            sx={{
                                                                width: 100,
                                                                height: 70,
                                                                border: '1px solid rgb(69, 83, 104)',
                                                                borderRadius: 2,
                                                                p: 0.5,
                                                                position: "relative",
                                                            }}
                                                        >
                                                            {isImage ? (
                                                                <img
                                                                    src={previewUrl}
                                                                    alt={file.name}
                                                                    style={{
                                                                        width: "100%",
                                                                        height: 60,
                                                                        objectFit: "cover",
                                                                        borderRadius: 4,
                                                                        color: 'white'
                                                                    }}
                                                                    onLoad={() => URL.revokeObjectURL(previewUrl)}
                                                                />
                                                            ) : (
                                                                <Typography
                                                                    variant="caption"
                                                                    sx={{
                                                                        display: "block",
                                                                        textAlign: "center",
                                                                        wordBreak: "break-word",
                                                                        color: 'white'
                                                                    }}
                                                                >
                                                                    {file.name}
                                                                </Typography>
                                                            )}

                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleRemoveFile(index)}
                                                                sx={{
                                                                    position: "absolute",
                                                                    top: -8,
                                                                    right: -8,
                                                                    bgcolor: "error.main",
                                                                    color: "white",
                                                                    ":hover": { bgcolor: "error.dark" },
                                                                }}
                                                            >
                                                                <X fontSize="small" sx={{ fontSize: 15 }} />
                                                            </IconButton>
                                                        </Box>
                                                    );
                                                })}
                                            </Box>
                                        ) : (
                                            <Typography variant="body1" sx={{ color: 'rgb(105, 115, 126)', fontWeight: 'bold', fontSize: 16 }}>
                                                Add FIle Link
                                            </Typography>
                                        )}
                                    </TableCell>

                                    {/* UPLOAD BUTTON */}
                                    <TableCell sx={{ border: 'none' }}>
                                        <input
                                            type="file"
                                            hidden
                                            multiple={multiple}
                                            accept={accept}
                                            id={`upload-${name}`}
                                            onChange={(e) => handleAddFiles(e.target.files)}
                                        />

                                        <IconButton
                                            onClick={() =>
                                                document.getElementById(`upload-${name}`)?.click()
                                            }
                                            sx={{ color: 'rgb(146, 168, 198)' }}
                                        >
                                            <AttachmentIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableBody >
                        </Table>
                    </TableContainer>

                )
            }}
        />

    )
}