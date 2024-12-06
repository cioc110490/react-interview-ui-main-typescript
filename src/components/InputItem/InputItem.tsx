import { Box, TextField, Typography } from "@mui/material";

interface InputItemProps {
    title: string;
    value: string | Number;
    setValue: Function;
    numeric?: boolean;
    showHelperText?: boolean;
    helperText?: string;
    error?: boolean;
}

export default function InputItem({ title, value, setValue, numeric, showHelperText, helperText, error }: InputItemProps) {

    const onSetValue = (newValue: string | Number) => {
        numeric ? setValue(Number(newValue)) : setValue(newValue)
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ width: '30%' }}>{title}</Typography>
            <TextField
                label={title}
                size="small"
                type={numeric ? 'number' : 'text'}
                sx={{ width: '70%' }}
                value={value}
                error={error}
                helperText={showHelperText && helperText}
                onChange={(e) => { onSetValue(e.target.value) }}
            />
        </Box>
    )
}