'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../theme';

/**
 * ThemeRegistry - клиентский компонент для интеграции MUI темы в Next.js App Router.
 * Оборачивает приложение в ThemeProvider и применяет CssBaseline для сброса стилей.
 */
export function ThemeRegistry({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}