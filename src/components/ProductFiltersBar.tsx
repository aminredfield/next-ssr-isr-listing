'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Slider from '@mui/material/Slider';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import type { ProductFilters } from '../types/filters';
import { SORT_OPTIONS } from '../types/filters';
import { useProductsAPI } from '../hooks/useProductsAPI';

interface ProductFiltersBarProps {
    onFiltersChange: (filters: ProductFilters) => void;
}

export function ProductFiltersBar({ onFiltersChange }: ProductFiltersBarProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();
    const searchParams = useSearchParams();
    const { fetchCategories } = useProductsAPI();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [category, setCategory] = useState(searchParams.get('category') || '');
    const [categories, setCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([
        Number(searchParams.get('minPrice')) || 0,
        Number(searchParams.get('maxPrice')) || 2000,
    ]);
    const [minRating, setMinRating] = useState<number>(
        Number(searchParams.get('minRating')) || 0
    );
    const [sortBy, setSortBy] = useState<string>(
        searchParams.get('sortBy') || ''
    );

    // Загрузка категорий
    useEffect(() => {
        fetchCategories().then(setCategories);
    }, [fetchCategories]);

    // Обновляем URL и вызываем колбэк при изменении фильтров
    useEffect(() => {
        const params = new URLSearchParams();

        if (search) params.set('search', search);
        if (category) params.set('category', category);
        if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString());
        if (priceRange[1] < 2000) params.set('maxPrice', priceRange[1].toString());
        if (minRating > 0) params.set('minRating', minRating.toString());
        if (sortBy) params.set('sortBy', sortBy);

        const newUrl = params.toString() ? `?${params.toString()}` : '/products';
        router.push(newUrl, { scroll: false });

        onFiltersChange({
            search: search || undefined,
            category: category || undefined,
            minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
            maxPrice: priceRange[1] < 2000 ? priceRange[1] : undefined,
            minRating: minRating > 0 ? minRating : undefined,
            sortBy: sortBy ? (sortBy as ProductFilters['sortBy']) : undefined,
        });
    }, [search, category, priceRange, minRating, sortBy, router, onFiltersChange]);

    const handleReset = () => {
        setSearch('');
        setCategory('');
        setPriceRange([0, 2000]);
        setMinRating(0);
        setSortBy('');
        router.push('/products', { scroll: false });
    };

    const hasActiveFilters =
        search || category || priceRange[0] > 0 || priceRange[1] < 2000 || minRating > 0 || sortBy;

    const activeFiltersCount = [
        search,
        category,
        priceRange[0] > 0 || priceRange[1] < 2000,
        minRating > 0,
        sortBy,
    ].filter(Boolean).length;

    // Компонент с расширенными фильтрами
    const AdvancedFilters = () => (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Диапазон цен */}
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <InputLabel shrink>Price Range</InputLabel>
                    <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                        ${priceRange[0]} - ${priceRange[1]}
                    </Box>
                </Box>
                <Slider
                    value={priceRange}
                    onChange={(_, newValue) => setPriceRange(newValue as [number, number])}
                    onChangeCommitted={(_, newValue) => {
                        // Применяем фильтр только когда пользователь отпустил слайдер
                        setPriceRange(newValue as [number, number]);
                    }}
                    valueLabelDisplay="auto"
                    min={0}
                    max={2000}
                    step={50}
                />
            </Box>

            {/* Минимальный рейтинг */}
            <Box>
                <InputLabel shrink sx={{ mb: 1 }}>
                    Minimum Rating
                </InputLabel>
                <Rating
                    value={minRating}
                    onChange={(_, newValue) => setMinRating(newValue || 0)}
                    precision={0.5}
                    size="large"
                />
            </Box>
        </Box>
    );

    return (
        <>
            {/* Горизонтальная панель фильтров */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                    {/* Поиск */}
                    <TextField
                        size="small"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                        }}
                        sx={{ minWidth: { xs: '100%', sm: 250 } }}
                    />

                    {/* Категория */}
                    <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 200 } }}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={category}
                            label="Category"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <MenuItem value="">All Categories</MenuItem>
                            {categories.map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Сортировка */}
                    <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 180 } }}>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={sortBy}
                            label="Sort By"
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <MenuItem value="">Default</MenuItem>
                            {SORT_OPTIONS.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Кнопка расширенных фильтров на десктопе */}
                    {!isMobile && (
                        <Button
                            variant="outlined"
                            startIcon={<FilterListIcon />}
                            onClick={() => setDrawerOpen(true)}
                        >
                            More Filters
                            {activeFiltersCount > 3 && (
                                <Chip
                                    label={activeFiltersCount - 3}
                                    size="small"
                                    color="primary"
                                    sx={{ ml: 1, height: 20 }}
                                />
                            )}
                        </Button>
                    )}

                    {/* Кнопка фильтров на мобильных */}
                    {isMobile && (
                        <IconButton
                            color="primary"
                            onClick={() => setDrawerOpen(true)}
                            sx={{ ml: 'auto' }}
                        >
                            <FilterListIcon />
                            {activeFiltersCount > 0 && (
                                <Chip
                                    label={activeFiltersCount}
                                    size="small"
                                    color="primary"
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        height: 20,
                                        minWidth: 20,
                                    }}
                                />
                            )}
                        </IconButton>
                    )}

                    {/* Кнопка сброса */}
                    {hasActiveFilters && (
                        <Button
                            size="small"
                            startIcon={<ClearIcon />}
                            onClick={handleReset}
                            color="secondary"
                            sx={{ ml: 'auto' }}
                        >
                            Reset
                        </Button>
                    )}
                </Box>
            </Paper>

            {/* Drawer с расширенными фильтрами */}
            <Drawer
                anchor={isMobile ? 'bottom' : 'right'}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                    sx: {
                        width: isMobile ? '100%' : 400,
                        maxHeight: isMobile ? '80vh' : '100%',
                    },
                }}
            >
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FilterListIcon color="primary" />
                        <Box sx={{ fontWeight: 600, fontSize: '1.125rem' }}>
                            Advanced Filters
                        </Box>
                    </Box>
                    <IconButton onClick={() => setDrawerOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <AdvancedFilters />

                <Box sx={{ p: 2, mt: 'auto', display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={handleReset}
                        startIcon={<ClearIcon />}
                    >
                        Reset All
                    </Button>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => setDrawerOpen(false)}
                    >
                        Apply
                    </Button>
                </Box>
            </Drawer>
        </>
    );
}