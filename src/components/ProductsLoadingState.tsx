import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

/**
 * ProductSkeleton - скелетон для карточки товара
 */
export function ProductSkeleton() {
    return (
        <Card>
            <Skeleton variant="rectangular" height={240} />
            <CardContent>
                <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 2, mb: 1 }} />
                <Skeleton variant="text" height={32} width="80%" />
                <Skeleton variant="text" height={24} width="60%" sx={{ mt: 1 }} />
                <Box sx={{ display: 'flex', gap: 1, mt: 2, alignItems: 'center' }}>
                    <Skeleton variant="text" height={32} width={100} />
                    <Skeleton variant="rectangular" width={60} height={24} sx={{ ml: 'auto', borderRadius: 2 }} />
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Skeleton variant="rectangular" height={32} sx={{ flex: 1, borderRadius: 1 }} />
                    <Skeleton variant="rectangular" height={32} sx={{ flex: 1, borderRadius: 1 }} />
                </Box>
            </CardContent>
        </Card>
    );
}

/**
 * ProductsLoadingState - состояние загрузки для списка товаров
 */
export function ProductsLoadingState() {
    return (
        <Grid container spacing={3}>
            {Array.from({ length: 8 }).map((_, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                    <ProductSkeleton />
                </Grid>
            ))}
        </Grid>
    );
}