import { Backdrop, Box, Button, CircularProgress, Snackbar, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { deleteWidget, findWidget } from "../../lib/apiConnect";

export default function DeleteWidget() {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [alreadyExists, setAlreadyExists] = useState(false)
    const [debouncing, setDebouncing] = useState(false)

    const onUpdate = async () => {
        setLoading(true);

        try {
            if (name) {
                await deleteWidget(name);

                setSuccess(true);
            }
        } catch (error: any) {
            console.error('Error fetching widgets', error);
        } finally {
            setLoading(false);
        }
    }

    const find = async () => {
        const response = await findWidget(name);
        const exists = response !== null;

        setAlreadyExists(exists);
        setDebouncing(false);
    };

    /*  Use debouncing to validate name to prevent API calls on each keystroke,
        instead, it will wait for the user to finish typing and then make the API call.
    */
    useEffect(() => {
        setDebouncing(true);

        const debounceTimeout = setTimeout(() => {
            find();
        }, 500); // Wait 500ms after the last keystroke

        return () => clearTimeout(debounceTimeout);
    }, [name]);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={5}
        >
            <Box sx={{ maxWidth: 450, width: 450 }}>
                <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: 4 }}>
                    Delete widget
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ width: '30%' }}>Name</Typography>
                        <TextField
                            label="Name"
                            size="small"
                            sx={{ width: '70%' }}
                            value={name}
                            helperText={alreadyExists && "Widget found."}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ textTransform: 'none' }}
                            disabled={!alreadyExists}
                            onClick={onUpdate}
                        >
                            Delete
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
                    message={'Widget deleted successfully.'}
                    onClose={() => setSuccess(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                />)
            }
        </Box>
    )
}