import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function Loading() {
  return (
    <Box>
      <Skeleton variant="rectangular" width={120} height={36} sx={{ mb: 3, borderRadius: 1 }} />

      <Paper elevation={1} sx={{ p: { xs: 3, md: 4 } }}>
        <Grid container spacing={4}>
          {/* Image skeleton */}
          <Grid item xs={12} md={6}>
            <Skeleton
              variant="rectangular"
              sx={{
                width: '100%',
                height: { xs: 300, md: 500 },
                borderRadius: 2,
              }}
            />
          </Grid>

          {/* Content skeleton */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 2 }} />
              <Skeleton variant="rectangular" width={100} height={24} sx={{ borderRadius: 2 }} />
            </Box>

            <Skeleton variant="text" width="90%" height={48} />
            <Skeleton variant="text" width="70%" height={32} sx={{ mb: 3 }} />

            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="80%" sx={{ mb: 3 }} />

            <Box sx={{ my: 3 }}>
              <Skeleton variant="text" width={60} height={24} />
              <Skeleton variant="text" width={150} height={56} />
            </Box>

            <Box sx={{ my: 3 }}>
              <Skeleton variant="text" width={100} height={24} />
              <Skeleton variant="rectangular" width={120} height={32} sx={{ borderRadius: 2 }} />
            </Box>

            <Skeleton variant="rectangular" width="100%" height={56} sx={{ borderRadius: 1, my: 3 }} />

            <Skeleton variant="rectangular" width="100%" height={80} sx={{ borderRadius: 1 }} />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
