import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import InventoryIcon from '@mui/icons-material/Inventory';

/**
 * EmptyState - компонент для отображения пустого состояния,
 * когда товары не найдены.
 */
export function EmptyState() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
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
        <InventoryIcon
          sx={{
            fontSize: 80,
            color: 'text.secondary',
            mb: 2,
            opacity: 0.5
          }}
        />

        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          No Products Found
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          There are currently no products available in the catalogue.
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 3,
            p: 2,
            backgroundColor: 'background.paper',
            borderRadius: 1,
            fontFamily: 'monospace',
            fontSize: '0.875rem'
          }}
        >
          Try editing <strong>src/data/products.ts</strong> to add some products
        </Typography>
      </Paper>
    </Box>
  );
}