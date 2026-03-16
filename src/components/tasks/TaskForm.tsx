import { Box, Grid, Paper } from "@mui/material";
export default function TaskForm() {
    return (
        <Box sx={{ minHeight: '100vh', p: 1 }}>

            {/* title */}



            {/*form  */}

            <form style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Paper elevation={23} sx={{ padding: 3, backgroundColor: 'rgb(25, 39, 52)' }}>
                    <Grid spacing={3} container>
                        {/* <DynamicForm
                            formConfig={input.inputForm}
                            control={control}
                        /> */}
                    </Grid>
                </Paper>

            </form>

            {/* Button submit */}

            <Box sx={{ mt: 3, display: 'flex', gap: 3, justifyContent: 'right', mr: 5 }}>

            </Box>
        </Box>
    )
}