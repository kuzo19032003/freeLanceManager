import { Box, CircularProgress} from "@mui/material";

export default function Loading() {
  return (
    <Box sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      bgcolor: 'rgba(255, 255, 255, 0.5)',
      zIndex: 1000,
    }}
    >
      <CircularProgress size={50} color="inherit" />
    </Box>
  );
}
