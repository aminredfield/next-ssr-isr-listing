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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
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
    description: `View details for ${product.title}`,
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

      <Paper elevation={1} sx={{ p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
          }}
        >
          {/* Изображение товара */}
          <Box
            sx={{
              position: 'relative',
              width: { xs: '100%', md: '400px' },
              height: { xs: '300px', md: '400px' },
              flexShrink: 0,
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

          {/* Информация о товаре */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 700, mb: 2 }}
            >
              {product.title}
            </Typography>

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

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Price
              </Typography>
              <Typography
                variant="h3"
                color="primary.main"
                sx={{ fontWeight: 700 }}
              >
                ${product.price.toFixed(2)}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Product ID
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontFamily: 'monospace', color: 'text.secondary' }}
              >
                {product.id}
              </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
              <AddToCartButton product={product} />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}