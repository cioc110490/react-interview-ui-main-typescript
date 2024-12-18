import { Backdrop, Box, Button, CircularProgress, Snackbar, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { findWidget, Widget } from "../../lib/apiConnect";

export default function FindWidget() {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [widget, setWidget] = useState<Widget | null>()
    const [notFound, setNotFound] = useState(false)

    const onFind = async () => {
        setLoading(true);

        try {
            const newWidget = await findWidget(name);

            setWidget(newWidget);
            setNotFound(newWidget === null);
        } catch (error: any) {
            console.error('Error finding widgets', error);
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
            <Box sx={{ maxWidth: 450, width: 450 }}>
                <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: 4 }}>
                    Find widget
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ width: '30%' }}>Name</Typography>
                        <TextField
                            label="Name"
                            size="small"
                            sx={{ width: '60%' }}
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ width: '30%' }}>Description</Typography>
                        <Typography sx={{ width: '60%' }}>{widget?.description}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ width: '30%' }}>Price</Typography>
                        <Typography sx={{ width: '60%' }}>{widget && `$${widget?.price}`}</Typography>
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

            {notFound && (
                <Snackbar
                    open={notFound}
                    autoHideDuration={2000}
                    message={`Widget ${name} not found.`}
                    onClose={() => setNotFound(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                />)
            }
        </Box>
    )
}