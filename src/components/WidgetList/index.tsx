import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React, { useEffect, useState } from 'react'

import { Box, CircularProgress } from '@mui/material'
import { fetchAllWidgets, Widget } from '../../lib/apiConnect'
import WidgetDisplay from '../WidgetDisplay'

const WidgetList = (): JSX.Element => {
    const [widgets, setWidgets] = useState<Widget[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchWidgets = async () => {
            setLoading(true);
            try {
                const fetchedWidgets = await fetchAllWidgets();
                setWidgets(fetchedWidgets);
            } catch (error) {
                console.error('Error fetching widgets', error);

                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        }

        fetchWidgets()
    }, [])

    return (
        <>
            {loading ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    pt={5}
                >
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    pt={5}
                >
                    <Typography color="error" variant="h6">
                        {error}
                    </Typography>
                </Box>
            ) : (
                widgets.length === 0 ?
                    <Typography sx={{ textAlign: 'center' }} variant="h4" pt={5}>
                        There are no widgets, try creating a new one.
                    </Typography>
                    :
                    <Stack
                        spacing={4}
                        sx={{ margin: 'auto', maxWidth: 900, paddingTop: '4em', width: '100%' }}
                    >
                        <Typography sx={{ textAlign: 'center' }} variant="h3">
                            List of widgets:
                        </Typography>
                        <Grid
                            container
                            justifyContent="center"
                            spacing={4}
                            sx={{ paddingRight: 4, width: '100%' }}
                        >
                            {widgets.map((current, index) => (
                                <WidgetDisplay key={index} widget={current} />
                            ))}
                        </Grid>
                    </Stack>
            )}
        </>
    )
}

export default WidgetList
