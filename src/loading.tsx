import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      bgcolor: 'rgba(255, 255, 255, 0.5)',
      zIndex: 9999,
    }}
    >
      <CircularProgress size={50} color="inherit" />
    </Box>
  );
}
