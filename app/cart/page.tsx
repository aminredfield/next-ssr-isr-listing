'use client';

import Image from 'next/image';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCart } from '../../src/context/CartContext';
import { useSnackbar } from '../../src/hooks/useSnackbar';

export default function CartPage() {
    const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
    const { showSnackbar, SnackbarComponent } = useSnackbar();

    const handleQuantityChange = (productId: string, quantity: number) => {
        if (quantity < 1) return;
        updateQuantity(productId, quantity);
    };

    const handleRemove = (productId: string, title: string) => {
        removeFromCart(productId);
        showSnackbar(`${title} removed from cart`, 'info');
    };

    const handleClearCart = () => {
        clearCart();
        showSnackbar('Cart cleared', 'info');
    };

    if (items.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '60vh',
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        p: 6,
                        textAlign: 'center',
                        maxWidth: 500,
                        backgroundColor: 'grey.50',
                    }}
                >
                    <ShoppingCartIcon
                        sx={{
                            fontSize: 80,
                            color: 'text.secondary',
                            mb: 2,
                            opacity: 0.5,
                        }}
                    />
                    <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                        Your Cart is Empty
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Add some products to your cart to see them here.
                    </Typography>
                    <Button
                        component={Link}
                        href="/products"
                        variant="contained"
                        sx={{ mt: 2 }}
                    >
                        Browse Products
                    </Button>
                </Paper>
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                    Shopping Cart
                </Typography>
                <Button
                    component={Link}
                    href="/products"
                    startIcon={<ArrowBackIcon />}
                    variant="text"
                >
                    Continue Shopping
                </Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                {/* Список товаров */}
                <Box sx={{ flex: 1 }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                    <TableCell align="center">Remove</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow key={item.product.id}>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Box
                                                    sx={{
                                                        position: 'relative',
                                                        width: 80,
                                                        height: 80,
                                                        flexShrink: 0,
                                                        backgroundColor: 'grey.50',
                                                        borderRadius: 1,
                                                    }}
                                                >
                                                    <Image
                                                        src={item.product.image}
                                                        alt={item.product.title}
                                                        fill
                                                        style={{ objectFit: 'contain', padding: '8px' }}
                                                    />
                                                </Box>
                                                <Box>
                                                    <Typography
                                                        component={Link}
                                                        href={`/products/${item.product.id}`}
                                                        variant="body1"
                                                        sx={{
                                                            fontWeight: 600,
                                                            textDecoration: 'none',
                                                            color: 'inherit',
                                                            '&:hover': { color: 'primary.main' },
                                                        }}
                                                    >
                                                        {item.product.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        ID: {item.product.id}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                ${item.product.price.toFixed(2)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    handleQuantityChange(item.product.id, parseInt(e.target.value) || 1)
                                                }
                                                size="small"
                                                inputProps={{ min: 1, max: 99 }}
                                                sx={{ width: 80 }}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                onClick={() => handleRemove(item.product.id, item.product.title)}
                                                color="error"
                                                size="small"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="text" color="error" onClick={handleClearCart}>
                            Clear Cart
                        </Button>
                    </Box>
                </Box>

                {/* Итоговая сумма */}
                <Paper sx={{ p: 3, height: 'fit-content', minWidth: 300 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                        Order Summary
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1">Items:</Typography>
                        <Typography variant="body1">{totalItems}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body1">Subtotal:</Typography>
                        <Typography variant="body1">${totalPrice.toFixed(2)}</Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Total:
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                            ${totalPrice.toFixed(2)}
                        </Typography>
                    </Box>

                    <Button
                        component={Link}
                        href="/checkout"
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{ mb: 2 }}
                    >
                        Proceed to Checkout
                    </Button>

                    <Button
                        component={Link}
                        href="/products"
                        variant="outlined"
                        fullWidth
                    >
                        Continue Shopping
                    </Button>
                </Paper>
            </Box>

            <SnackbarComponent />
        </Box>
    );
}