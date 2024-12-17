import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React, { useEffect, useState } from 'react'

import { Box, CircularProgress, Pagination, TextField } from '@mui/material'
import { fetchPaginatedWidgets, Widget } from '../../lib/apiConnect'
import WidgetDisplay from '../WidgetDisplay'

const WidgetList = (): JSX.Element => {
    const [widgets, setWidgets] = useState<Widget[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const fetchWidgets = async (currentPage: number) => {
            setLoading(true);
            try {
                const response = await fetchPaginatedWidgets(currentPage, pageSize);

                setWidgets(response.widgets);

                const totalPages = Math.ceil(response.total / pageSize);
                setTotalPages(totalPages);
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

        fetchWidgets(page)
    }, [page, pageSize])

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    const handlePageSizeChange = (value: number) => {
        if(value >= 1) {
            setPageSize(value)
        }
    }

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
                widgets?.length === 0 ?
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
                            {widgets?.map((current, index) => (
                                <WidgetDisplay key={index} widget={current} />
                            ))}
                        </Grid>
                        <Box display="flex" justifyContent="center">
                            <Stack sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} gap={1}>
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={handlePageChange}
                                    color="primary"
                                    size="medium"
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                                    <Typography>Items per page</Typography>
                                    <TextField
                                        size="small"
                                        type='number'
                                        sx={{width: '70px'}}
                                        value={pageSize}
                                        onChange={e => { handlePageSizeChange(Number(e.target.value)) }}
                                    />
                                </Box>
                            </Stack>
                        </Box>
                    </Stack>
            )}
        </>
    )
}

export default WidgetList
