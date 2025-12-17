import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import StorefrontIcon from '@mui/icons-material/Storefront';

export default function HomePage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 6,
          maxWidth: 600,
          backgroundColor: 'transparent',
        }}
      >
        <StorefrontIcon 
          sx={{ 
            fontSize: 80, 
            color: 'primary.main', 
            mb: 3 
          }} 
        />
        
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ fontWeight: 700, mb: 2 }}
        >
          Welcome to Product Catalogue
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary" 
          paragraph
          sx={{ mb: 4, fontSize: '1.125rem' }}
        >
          Explore our modern product catalogue demonstrating server-side rendering (SSR) 
          and incremental static regeneration (ISR) with Next.js
        </Typography>
        
        <Button
          component={Link}
          href="/products"
          variant="contained"
          size="large"
          sx={{ 
            px: 5, 
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
          }}
        >
          Browse Products
        </Button>
      </Paper>
    </Box>
  );
}