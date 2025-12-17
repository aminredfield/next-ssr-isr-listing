'use client';

import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import RefreshIcon from '@mui/icons-material/Refresh';

/**
 * Error boundary для страницы products.
 * Отображает дружелюбное сообщение об ошибке с возможностью повторить запрос.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Products page error:', error);
  }, [error]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          maxWidth: 600,
          width: '100%',
        }}
      >
        <Alert severity="error" sx={{ mb: 3 }}>
          <AlertTitle sx={{ fontWeight: 600 }}>Something went wrong</AlertTitle>
          {error.message || 'An unexpected error occurred while loading products'}
        </Alert>

        <Typography variant="body2" color="text.secondary" paragraph>
          We encountered an error while fetching the products. This could be due to a
          temporary issue with the data source.
        </Typography>

        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={reset}
          fullWidth
          sx={{ mt: 2 }}
        >
          Try Again
        </Button>
      </Paper>
    </Box>
  );
}