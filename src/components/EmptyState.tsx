import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import InventoryIcon from '@mui/icons-material/Inventory';

/**
 * EmptyState - компонент для отображения пустого состояния
 */
export function EmptyState({ message }: { message?: string }) {
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
            opacity: 0.5,
          }}
        />

        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          {message || 'No Products Found'}
        </Typography>

        {!message && (
          <Typography variant="body1" color="text.secondary">
            There are currently no products available in the catalogue.
          </Typography>
        )}
      </Paper>
    </Box>
  );
}