import Link from 'next/link';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Fetch categories для главной страницы
async function getCategories() {
  try {
    const res = await fetch('https://dummyjson.com/products/categories', {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    // DummyJSON возвращает массив объектов {slug, name, url}
    // Берём первые 8 и извлекаем slug
    return data.slice(0, 8).map((cat: any) => cat.slug || cat);
  } catch {
    return [];
  }
}

// Fetch популярных товаров
async function getFeaturedProducts() {
  try {
    const res = await fetch('https://dummyjson.com/products?limit=4', {
      next: { revalidate: 300 },
    });
    const data = await res.json();
    return data.products;
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const categories = await getCategories();
  const featuredProducts = await getFeaturedProducts();

  return (
    <Box>
      {/* Hero секция */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 8 },
          mb: 6,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: 3,
        }}
      >
        <StorefrontIcon sx={{ fontSize: 80, mb: 2, opacity: 0.9 }} />

        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700, mb: 2 }}
        >
          Welcome to Product Catalogue
        </Typography>

        <Typography
          variant="h6"
          paragraph
          sx={{ mb: 4, maxWidth: 700, mx: 'auto', opacity: 0.95 }}
        >
          Discover thousands of products with modern filtering, search, and seamless shopping experience
        </Typography>

        <Button
          component={Link}
          href="/products"
          variant="contained"
          size="large"
          endIcon={<ArrowForwardIcon />}
          sx={{
            px: 5,
            py: 1.5,
            fontSize: '1.125rem',
            fontWeight: 600,
            backgroundColor: 'white',
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'grey.100',
            },
          }}
        >
          Browse Products
        </Button>
      </Paper>

      {/* Преимущества */}
      <Box sx={{ mb: 8 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, mb: 4 }}
        >
          Why Shop With Us
        </Typography>

        <Grid container spacing={3}>
          {[
            {
              icon: <LocalShippingIcon sx={{ fontSize: 48 }} />,
              title: 'Free Shipping',
              description: 'Free delivery on all orders over $50',
            },
            {
              icon: <VerifiedUserIcon sx={{ fontSize: 48 }} />,
              title: 'Secure Payment',
              description: '100% secure payment processing',
            },
            {
              icon: <SupportAgentIcon sx={{ fontSize: 48 }} />,
              title: '24/7 Support',
              description: 'Dedicated customer support team',
            },
            {
              icon: <StorefrontIcon sx={{ fontSize: 48 }} />,
              title: 'Quality Products',
              description: 'Hand-picked quality products',
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  backgroundColor: 'grey.50',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'primary.50',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Категории */}
      {categories.length > 0 && (
        <Box sx={{ mb: 8 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Shop by Category
            </Typography>
            <Button
              component={Link}
              href="/products"
              endIcon={<ArrowForwardIcon />}
            >
              View All
            </Button>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
              },
            }}
          >
            {categories.map((category: any) => (
              <Paper
                key={category}
                component={Link}
                href={`/products?category=${category}`}
                sx={{
                  p: 3,
                  minHeight: 110,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  textDecoration: 'none',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                    borderColor: 'primary.main',
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: 'text.primary', textTransform: 'capitalize' }}
                >
                  {category.replace(/-/g, ' ')}
                </Typography>
              </Paper>
            ))}
          </Box>

        </Box>
      )}

      {/* Популярные товары */}
      {featuredProducts.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Featured Products
            </Typography>
            <Button
              component={Link}
              href="/products"
              endIcon={<ArrowForwardIcon />}
            >
              View All
            </Button>
          </Box>

          <Grid container spacing={3}>
            {featuredProducts.map((product: any) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <Card
                  component={Link}
                  href={`/products/${product.id}`}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: 200,
                      bgcolor: 'grey.50',
                    }}
                  >
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      style={{ objectFit: 'contain', padding: '16px' }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        minHeight: '3rem',
                      }}
                    >
                      {product.title}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="primary.main"
                      sx={{ fontWeight: 700 }}
                    >
                      ${product.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* CTA секция */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 6 },
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Ready to Start Shopping?
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 3, opacity: 0.95 }}>
          Explore our full catalogue of products and find exactly what you need
        </Typography>
        <Button
          component={Link}
          href="/products"
          variant="contained"
          size="large"
          sx={{
            backgroundColor: 'white',
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'grey.100',
            },
          }}
        >
          Explore Products
        </Button>
      </Paper>
    </Box>
  );
}
