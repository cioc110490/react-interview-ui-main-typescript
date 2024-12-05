import { Backdrop, Box, Button, CircularProgress, Snackbar, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createWidget, findWidget, Widget } from "../../lib/apiConnect";

export default function CreateWidget() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState<number>(0)
    const [loading, setLoading] = useState(false)
    const [newWidget, setNewWidget] = useState<Widget | undefined>()
    const [success, setSuccess] = useState(false)
    const [creationError, setCreationError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [alreadyExists, setAlreadyExists] = useState(false)
    const [validation, setValidation] = useState(false)
    const [debouncing, setDebouncing] = useState(false)

    const onCreate = async () => {
        setLoading(true);

        try {
            if (name && description && price) {
                const newWidget = await createWidget({ name: name, description: description, price: price });

                setName('')
                setDescription('')
                setPrice(0)
                setNewWidget(newWidget);
                setSuccess(true);
            }
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                console.error('Error fetching widgets', error);

                setErrorMessage(error.response.data);
            } else {
                setErrorMessage("An unexpected error occurred");
            }

            setCreationError(true);
        } finally {
            setLoading(false);
        }
    }

    const validateInputs = async () => {
        // Validate that name is between 3 and 100 characters
        const isNameValid = name.length >= 3 && name.length <= 100;

        // Validate that descrption is between 5 and 1000 characters
        const isDescriptionValid = description.length >= 5 && description.length <= 1000;

        // Validate that price is between 1 and 20000 with 2 decimal precision
        const isPriceValid = price >= 1 && price <= 20000 && !isNaN(price) && /^(\d+(\.\d{0,2})?)?$/.test(price.toString());

        const response = await findWidget(name);
        const exists = response !== null;

        setAlreadyExists(exists);
        setValidation(!(isNameValid && isDescriptionValid && isPriceValid && !exists));
        setDebouncing(false);
    };

    /*  Use debouncing to validate name to prevent API calls on each keystroke,
        instead, it will wait for the user to finish typing and then make the API call.
    */
    useEffect(() => {
        setDebouncing(true);

        const debounceTimeout = setTimeout(() => {
            validateInputs();
        }, 500); // Wait 500ms after the last keystroke

        return () => clearTimeout(debounceTimeout);
    }, [name]);

    // Validate description and price
    useEffect(() => {
        validateInputs();
    }, [description, price]);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={5}
        >
            <Box sx={{ maxWidth: 600 }}>
                <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: 4 }}>
                    Create a new widget
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ width: '30%' }}>Name</Typography>
                        <TextField
                            label="Name"
                            size="small"
                            sx={{ width: '70%' }}
                            value={name}
                            helperText={alreadyExists && "Widget already exists."}
                            error={alreadyExists}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ width: '30%' }}>Description</Typography>
                        <TextField
                            label="Description"
                            size="small"
                            sx={{ width: '70%' }}
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ width: '30%' }}>Price</Typography>
                        <TextField
                            label="Price"
                            size="small"
                            type="number"
                            sx={{ width: '70%' }}
                            value={price}
                            onChange={(e) => { setPrice(Number(e.target.value)) }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ textTransform: 'none' }}
                            disabled={validation || debouncing}
                            onClick={onCreate}
                        >
                            Create
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
                    message={`Widget ${newWidget?.name} created successfully.`}
                    onClose={() => setSuccess(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                />)
            }

            {creationError && (
                <Snackbar
                    open={creationError}
                    autoHideDuration={2000}
                    message={errorMessage}
                    onClose={() => setCreationError(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                />)
            }
        </Box>
    )
}