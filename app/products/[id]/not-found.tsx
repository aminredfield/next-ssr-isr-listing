import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import SearchOffIcon from '@mui/icons-material/SearchOff';

/**
 * 404 страница для несуществующего товара.
 */
export default function NotFound() {
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
        <SearchOffIcon
          sx={{
            fontSize: 80,
            color: 'text.secondary',
            mb: 2,
            opacity: 0.5
          }}
        />

        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          Product Not Found
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          The product you are looking for does not exist or has been removed from the catalogue.
        </Typography>

        <Button
          component={Link}
          href="/products"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Back to Products
        </Button>
      </Paper>
    </Box>
  );
}