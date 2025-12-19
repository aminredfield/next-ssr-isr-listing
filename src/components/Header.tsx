'use client';

import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Box from '@mui/material/Box';
import { useCart } from '../context/CartContext';

/**
 * Header - шапка приложения с логотипом и корзиной
 */
export function Header() {
    const { totalItems } = useCart();

    return (
        <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', color: 'text.primary' }}>
            <Toolbar>
                <IconButton
                    component={Link}
                    href="/"
                    edge="start"
                    color="primary"
                    aria-label="home"
                    sx={{ mr: 2 }}
                >
                    <StorefrontIcon />
                </IconButton>

                <Typography
                    variant="h6"
                    component={Link}
                    href="/"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 700,
                        textDecoration: 'none',
                        color: 'primary.main',
                    }}
                >
                    Product Catalogue
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Typography
                        component={Link}
                        href="/products"
                        sx={{
                            textDecoration: 'none',
                            color: 'text.primary',
                            fontWeight: 500,
                            display: { xs: 'none', sm: 'block' },
                            '&:hover': {
                                color: 'primary.main',
                            },
                        }}
                    >
                        Products
                    </Typography>

                    <IconButton
                        component={Link}
                        href="/cart"
                        color="primary"
                        aria-label="shopping cart"
                    >
                        <Badge badgeContent={totalItems} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}