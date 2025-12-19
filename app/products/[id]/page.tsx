import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { fetchProductById } from '../../../src/lib/products';
import { AddToCartButton } from '../../../src/components/AddToCartButton';

interface Params {
  id: string;
}

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const product = await fetchProductById(params.id);
  if (!product) {
    return {
      title: 'Product not found',
    };
  }
  return {
    title: product.title,
    description: product.description || `View details for ${product.title}`,
    alternates: {
      canonical: `/products/${product.id}`,
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Params }) {
  const product = await fetchProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <Box>
      <Button
        component={Link}
        href="/products"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back to Products
      </Button>

      <Paper elevation={1} sx={{ p: { xs: 3, md: 4 } }}>
        <Grid container spacing={4}>
          {/* Изображение товара */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: { xs: 300, md: 500 },
                backgroundColor: 'grey.50',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                style={{ objectFit: 'contain', padding: '24px' }}
                priority
              />
            </Box>
          </Grid>

          {/* Информация о товаре */}
          <Grid item xs={12} md={6}>
            {/* Категория и бренд */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              {product.category && (
                <Chip
                  label={product.category}
                  size="small"
                  sx={{ textTransform: 'capitalize' }}
                />
              )}
              {product.brand && (
                <Chip label={product.brand} size="small" variant="outlined" />
              )}
            </Box>

            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 700, mb: 2 }}
            >
              {product.title}
            </Typography>

            {/* Рейтинг */}
            {product.rating != null && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Chip
                  icon={<StarIcon />}
                  label={`${product.rating.toFixed(1)} / 5.0`}
                  color="warning"
                  size="medium"
                />
              </Box>
            )}

            {/* Описание */}
            {product.description && (
              <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 3 }}>
                {product.description}
              </Typography>
            )}

            <Divider sx={{ my: 3 }} />

            {/* Цена */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Price
              </Typography>
              <Typography variant="h3" color="primary.main" sx={{ fontWeight: 700 }}>
                ${product.price.toFixed(2)}
              </Typography>
            </Box>

            {/* Наличие */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Availability
              </Typography>
              {product.stock > 0 ? (
                <Chip
                  label={`${product.stock} in stock`}
                  color="success"
                  size="medium"
                />
              ) : (
                <Chip label="Out of stock" color="error" size="medium" />
              )}
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Кнопка добавления в корзину */}
            <Box sx={{ mb: 3 }}>
              <AddToCartButton product={product} />
            </Box>

            {/* Информация о доставке */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                backgroundColor: 'grey.50',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <LocalShippingIcon color="primary" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Free Shipping
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  On orders over $50
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}