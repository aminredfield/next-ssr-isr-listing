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
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import type { ProductFilters } from '../types/filters';
import { SORT_OPTIONS } from '../types/filters';

interface ProductFiltersComponentProps {
    onFiltersChange: (filters: ProductFilters) => void;
}

export function ProductFiltersComponent({ onFiltersChange }: ProductFiltersComponentProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [priceRange, setPriceRange] = useState<[number, number]>([
        Number(searchParams.get('minPrice')) || 0,
        Number(searchParams.get('maxPrice')) || 1000,
    ]);
    const [minRating, setMinRating] = useState<number>(
        Number(searchParams.get('minRating')) || 0
    );
    const [sortBy, setSortBy] = useState<string>(
        searchParams.get('sortBy') || ''
    );

    // Обновляем URL при изменении фильтров
    useEffect(() => {
        const params = new URLSearchParams();

        if (search) params.set('search', search);
        if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString());
        if (priceRange[1] < 1000) params.set('maxPrice', priceRange[1].toString());
        if (minRating > 0) params.set('minRating', minRating.toString());
        if (sortBy) params.set('sortBy', sortBy);

        const newUrl = params.toString() ? `?${params.toString()}` : '/products';
        router.push(newUrl, { scroll: false });

        // Передаем фильтры родителю
        onFiltersChange({
            search: search || undefined,
            minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
            maxPrice: priceRange[1] < 1000 ? priceRange[1] : undefined,
            minRating: minRating > 0 ? minRating : undefined,
            sortBy: sortBy ? (sortBy as ProductFilters['sortBy']) : undefined,
        });
    }, [search, priceRange, minRating, sortBy, router]);

    const handleReset = () => {
        setSearch('');
        setPriceRange([0, 1000]);
        setMinRating(0);
        setSortBy('');
        router.push('/products', { scroll: false });
    };

    const hasActiveFilters = search || priceRange[0] > 0 || priceRange[1] < 1000 || minRating > 0 || sortBy;

    return (
        <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FilterListIcon color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Filters
                    </Typography>
                </Box>
                {hasActiveFilters && (
                    <Button
                        size="small"
                        startIcon={<ClearIcon />}
                        onClick={handleReset}
                        color="secondary"
                    >
                        Reset
                    </Button>
                )}
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Поиск */}
                <TextField
                    fullWidth
                    label="Search Products"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                />

                {/* Сортировка */}
                <FormControl fullWidth>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                        value={sortBy}
                        label="Sort By"
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>Default</em>
                        </MenuItem>
                        {SORT_OPTIONS.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Диапазон цен */}
                <Box>
                    <Typography variant="body2" gutterBottom sx={{ fontWeight: 600 }}>
                        Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </Typography>
                    <Slider
                        value={priceRange}
                        onChange={(_, newValue) => setPriceRange(newValue as [number, number])}
                        valueLabelDisplay="auto"
                        min={0}
                        max={1000}
                        step={10}
                        sx={{ mt: 2 }}
                    />
                </Box>

                {/* Минимальный рейтинг */}
                <Box>
                    <Typography variant="body2" gutterBottom sx={{ fontWeight: 600 }}>
                        Minimum Rating
                    </Typography>
                    <Rating
                        value={minRating}
                        onChange={(_, newValue) => setMinRating(newValue || 0)}
                        precision={0.5}
                        size="large"
                    />
                    {minRating > 0 && (
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                            {minRating}+ stars
                        </Typography>
                    )}
                </Box>
            </Box>
        </Paper>
    );
}