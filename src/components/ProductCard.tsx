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
 */
export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { showSnackbar, SnackbarComponent } = useSnackbar();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
          position: 'relative',
          overflow: 'visible',
        }}
      >
        {/* Badge для низкого запаса */}
        {product.stock < 10 && product.stock > 0 && (
          <Chip
            label={`Only ${product.stock} left`}
            size="small"
            color="warning"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 1,
              fontWeight: 600,
            }}
          />
        )}

        {product.stock === 0 && (
          <Chip
            label="Out of stock"
            size="small"
            color="error"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 1,
              fontWeight: 600,
            }}
          />
        )}

        <Box
          component={Link}
          href={`/products/${product.id}`}
          sx={{
            position: 'relative',
            width: '100%',
            height: 240,
            bgcolor: 'grey.50',
            textDecoration: 'none',
            display: 'block',
          }}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            style={{ objectFit: 'contain', padding: '16px' }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {/* Категория */}
          {product.category && (
            <Chip
              label={product.category}
              size="small"
              sx={{
                width: 'fit-content',
                textTransform: 'capitalize',
                fontSize: '0.75rem',
              }}
            />
          )}

          {/* Название */}
          <Typography
            component={Link}
            href={`/products/${product.id}`}
            variant="h6"
            sx={{
              fontWeight: 600,
              minHeight: '3rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              textDecoration: 'none',
              color: 'text.primary',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            {product.title}
          </Typography>

          {/* Бренд */}
          {product.brand && (
            <Typography variant="body2" color="text.secondary">
              {product.brand}
            </Typography>
          )}

          {/* Цена и рейтинг */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto' }}>
            <Typography variant="h5" color="primary.main" sx={{ fontWeight: 700 }}>
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

          {/* Кнопки действий */}
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Button
              component={Link}
              href={`/products/${product.id}`}
              variant="outlined"
              fullWidth
              size="small"
            >
              Details
            </Button>
            <Button
              variant="contained"
              fullWidth
              size="small"
              startIcon={<AddShoppingCartIcon />}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Sold Out' : 'Add'}
            </Button>
          </Box>
        </CardContent>
      </Card>
      <SnackbarComponent />
    </>
  );
}