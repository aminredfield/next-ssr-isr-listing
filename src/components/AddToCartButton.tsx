'use client';

import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import type { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { useSnackbar } from '../hooks/useSnackbar';

/**
 * AddToCartButton - клиентская кнопка для добавления товара в корзину
 */
export function AddToCartButton({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const { showSnackbar, SnackbarComponent } = useSnackbar();

    const handleAddToCart = () => {
        addToCart(product);
        showSnackbar(`${product.title} added to cart!`, 'success');
    };

    return (
        <>
            <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<AddShoppingCartIcon />}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                sx={{ py: 1.5, fontSize: '1.125rem' }}
            >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            <SnackbarComponent />
        </>
    );
}