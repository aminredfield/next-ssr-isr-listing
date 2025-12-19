'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../theme';
import { CartProvider } from '../context/CartContext';

/**
 * ThemeRegistry - клиентский компонент для интеграции MUI темы в Next.js App Router
 */
export function ThemeRegistry({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <CartProvider>
                {children}
            </CartProvider>
        </ThemeProvider>
    );
}