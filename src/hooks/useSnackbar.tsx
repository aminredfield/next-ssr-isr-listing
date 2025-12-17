'use client';

import { useState, useCallback } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

interface SnackbarState {
    open: boolean;
    message: string;
    severity: AlertColor;
}

export function useSnackbar() {
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        message: '',
        severity: 'success',
    });

    const showSnackbar = useCallback(
        (message: string, severity: AlertColor = 'success') => {
            setSnackbar({ open: true, message, severity });
        },
        []
    );

    const hideSnackbar = useCallback(() => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    }, []);

    const SnackbarComponent = useCallback(
        () => (
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={hideSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={hideSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        ),
        [snackbar, hideSnackbar]
    );

    return { showSnackbar, SnackbarComponent };
}