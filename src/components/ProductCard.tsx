'use client';

import Image from 'next/image';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import type { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { useSnackbar } from '../hooks/useSnackbar';

/**
 * ProductCard - карточка товара с использованием Material UI.
 * Отображает изображение, название, цену, рейтинг и кнопки действий.
 */
export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { showSnackbar, SnackbarComponent } = useSnackbar();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    showSnackbar(`${product.title} added to cart!`, 'success');
  };

  return (
    <>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', height: 240, bgcolor: 'grey.50' }}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            style={{ objectFit: 'contain', padding: '16px' }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 600,
              minHeight: '3rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto' }}>
            <Typography
              variant="h5"
              color="primary.main"
              sx={{ fontWeight: 700 }}
            >
              ${product.price.toFixed(2)}
            </Typography>

            {product.rating != null && (
              <Chip
                icon={<StarIcon sx={{ fontSize: '1rem' }} />}
                label={product.rating.toFixed(1)}
                size="small"
                color="warning"
                sx={{ ml: 'auto' }}
              />
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Button
              component={Link}
              href={`/products/${product.id}`}
              variant="outlined"
              fullWidth
            >
              Details
            </Button>
            <Button
              variant="contained"
              fullWidth
              startIcon={<AddShoppingCartIcon />}
              onClick={handleAddToCart}
            >
              Add
            </Button>
          </Box>
        </CardContent>
      </Card>
      <SnackbarComponent />
    </>
  );
}