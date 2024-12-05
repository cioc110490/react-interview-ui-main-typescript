import { Backdrop, Box, Button, CircularProgress, Snackbar, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createWidget, findWidget, updateWidget, Widget } from "../../lib/apiConnect";

export default function FindWidget() {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [widget, setWidget] = useState<Widget | null>()
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onFind = async () => {
        setLoading(true);

        try {
            if (name) {
                const newWidget = await findWidget(name);

                setWidget(newWidget);
                setSuccess(true);
            }
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                console.error('Error fetching widgets', error);

                setErrorMessage(error.response.data);
            } else {
                setErrorMessage("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={5}
        >
            <Box sx={{ maxWidth: 600 }}>
                <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: 4 }}>
                    Find widget
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ width: '30%' }}>Name</Typography>
                        <TextField
                            label="Name"
                            size="small"
                            sx={{ width: '70%' }}
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ width: '30%' }}>Description</Typography>
                        <Typography sx={{ width: '70%' }}>{widget?.description}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ width: '30%' }}>Price</Typography>
                        <Typography sx={{ width: '70%' }}>{widget && `$${widget?.price}`}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ textTransform: 'none' }}
                            disabled={name.length === 0}
                            onClick={onFind}
                        >
                            Find
                        </Button>
                    </Box>
                </Box>
            </Box>

            {loading && (
                <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}

            {success && (
                <Snackbar
                    open={success}
                    autoHideDuration={2000}
                    message={`Widget ${widget?.name} updated successfully.`}
                    onClose={() => setSuccess(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                />)
            }
        </Box>
    )
}