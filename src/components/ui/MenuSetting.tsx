'use client';

import { Avatar, Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { use, useState } from "react";
import { Logout, Settings } from "@mui/icons-material";

export default function MenuSetting() {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <Box sx={{ position: 'relative' }}>
            {open && (
                <Paper
                    elevation={3}
                    sx={{
                        width: '14vw',
                        position: "absolute",
                        bottom: "70px",
                        right: 11,
                        p: 1.5,
                        borderRadius: 2,
                        animation: "fadeSlide 0.25s ease-in-out",
                        cursor: 'pointer',
                        '& .MuiAvatar-root': {
                            width: 25,
                            height: 25,
                            ml: -0.5,
                            mr: 1,
                        },
                    }}
                >
                    <Box sx={{ py: 1, display: 'flex', alignItems: 'center' }}>
                        <Avatar /> Profile
                    </Box>
                    <Divider />
                    <Box sx={{ py: 1, display: 'flex', alignItems: 'center',gap:1 }}>
                        <Settings fontSize="small" /> Setting
                    </Box>
                    <Box sx={{ py: 1, display: 'flex', alignItems: 'center',gap:1 }}>
                        <Logout fontSize="small" /> LogOut
                    </Box>
                </Paper>
            )}
            <Box
                onClick={() => setOpen(!open)}
                sx={{
                    p: 3.5,
                    color: 'rgb(146, 168, 198)',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textTransform: 'none',
                }}
            >
                <IconButton
                    size="small"
                    sx={{
                        color: 'rgb(146, 168, 198)',
                        transition: 'transform 0.3s ease',
                        transform: open ? 'rotate(240deg)' : 'rotate(0deg)',
                    }}
                >
                    <SettingsOutlinedIcon />
                </IconButton>
                <Typography sx={{ fontWeight: 'bold' }}>
                    Settings
                </Typography>
            </Box>
            <style>
                {`
                    @keyframes fadeSlide {
                        0% {
                            opacity: 0;
                            transform: translateY(10px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateY(0px);
                        }
                    }
                `}
            </style>
        </Box>

    );
}