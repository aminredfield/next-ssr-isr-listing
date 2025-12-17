'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useCart } from '../../src/context/CartContext';
import type { CheckoutFormData } from '../../src/types/order';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, totalPrice, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState<CheckoutFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        paymentMethod: 'card',
        comments: '',
    });

    // Проверяем пустую корзину в useEffect, чтобы не блокировать редирект при очистке
    useEffect(() => {
        // Разрешаем оставаться на странице если идет процесс отправки заказа
        if (!isSubmitting && items.length === 0) {
            router.push('/cart');
        }
    }, [items.length, router, isSubmitting]);

    const handleChange = (field: keyof CheckoutFormData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [field]: e.target.value });
        // Убираем ошибку при изменении поля
        if (errors[field]) {
            setErrors({ ...errors, [field]: undefined });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

        // Имя
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        // Фамилия
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        // Телефон
        const phoneRegex = /^\+?[\d\s\-()]+$/;
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        } else if (!phoneRegex.test(formData.phone) || formData.phone.replace(/\D/g, '').length < 10) {
            newErrors.phone = 'Invalid phone number';
        }

        // Адрес
        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        // Город
        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        }

        // Почтовый индекс
        if (!formData.postalCode.trim()) {
            newErrors.postalCode = 'Postal code is required';
        }

        // Страна
        if (!formData.country.trim()) {
            newErrors.country = 'Country is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setIsSubmitting(true); // Устанавливаем флаг отправки

        // Имитация отправки заказа
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Создаем заказ
        const order = {
            id: Date.now().toString(),
            orderNumber: `ORD-${Date.now().toString().slice(-8)}`,
            date: new Date().toISOString(),
            formData,
            items: items.map((item) => ({
                productId: item.product.id,
                title: item.product.title,
                price: item.product.price,
                quantity: item.quantity,
            })),
            totalPrice,
            status: 'pending' as const,
        };

        // Сохраняем в localStorage
        localStorage.setItem('lastOrder', JSON.stringify(order));

        // ВАЖНО: Сначала перенаправляем, потом очищаем корзину!
        // Иначе clearCart() вызовет ре-рендер и сработает редирект на /cart
        router.push('/checkout/success');

        // Очищаем корзину после небольшой задержки
        setTimeout(() => {
            clearCart();
        }, 100);
    };

    return (
        <Box>
            <Button
                onClick={() => router.back()}
                startIcon={<ArrowBackIcon />}
                sx={{ mb: 3 }}
            >
                Back to Cart
            </Button>

            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                Checkout
            </Typography>

            <Grid container spacing={3}>
                {/* Форма */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3 }}>
                        <form onSubmit={handleSubmit}>
                            {/* Личные данные */}
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                                Personal Information
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        value={formData.firstName}
                                        onChange={handleChange('firstName')}
                                        error={!!errors.firstName}
                                        helperText={errors.firstName}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        value={formData.lastName}
                                        onChange={handleChange('lastName')}
                                        error={!!errors.lastName}
                                        helperText={errors.lastName}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange('email')}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange('phone')}
                                        error={!!errors.phone}
                                        helperText={errors.phone}
                                        placeholder="+1 234 567 8900"
                                        required
                                    />
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 3 }} />

                            {/* Адрес доставки */}
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                                Delivery Address
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Street Address"
                                        value={formData.address}
                                        onChange={handleChange('address')}
                                        error={!!errors.address}
                                        helperText={errors.address}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="City"
                                        value={formData.city}
                                        onChange={handleChange('city')}
                                        error={!!errors.city}
                                        helperText={errors.city}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Postal Code"
                                        value={formData.postalCode}
                                        onChange={handleChange('postalCode')}
                                        error={!!errors.postalCode}
                                        helperText={errors.postalCode}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Country"
                                        value={formData.country}
                                        onChange={handleChange('country')}
                                        error={!!errors.country}
                                        helperText={errors.country}
                                        required
                                    />
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 3 }} />

                            {/* Способ оплаты */}
                            <FormControl component="fieldset">
                                <FormLabel component="legend" sx={{ fontWeight: 600, mb: 1 }}>
                                    Payment Method
                                </FormLabel>
                                <RadioGroup
                                    value={formData.paymentMethod}
                                    onChange={handleChange('paymentMethod')}
                                >
                                    <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
                                    <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                                    <FormControlLabel value="cash" control={<Radio />} label="Cash on Delivery" />
                                </RadioGroup>
                            </FormControl>

                            <Divider sx={{ my: 3 }} />

                            {/* Комментарии */}
                            <TextField
                                fullWidth
                                label="Order Comments (Optional)"
                                multiline
                                rows={3}
                                value={formData.comments}
                                onChange={handleChange('comments')}
                                placeholder="Special delivery instructions, gift message, etc."
                            />

                            <Box sx={{ mt: 3 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    disabled={loading}
                                    startIcon={loading ? <CircularProgress size={20} /> : <ShoppingCartCheckoutIcon />}
                                >
                                    {loading ? 'Processing...' : 'Place Order'}
                                </Button>
                            </Box>
                        </form>
                    </Paper>
                </Grid>

                {/* Сводка заказа */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, position: 'sticky', top: 100 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                            Order Summary
                        </Typography>
                        <Divider sx={{ my: 2 }} />

                        {items.map((item) => (
                            <Box key={item.product.id} sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        {item.product.title}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.quantity} × ${item.product.price.toFixed(2)}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        ${(item.product.price * item.quantity).toFixed(2)}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body1">Subtotal:</Typography>
                            <Typography variant="body1">${totalPrice.toFixed(2)}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body1">Shipping:</Typography>
                            <Typography variant="body1" color="success.main">
                                FREE
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                Total:
                            </Typography>
                            <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                                ${totalPrice.toFixed(2)}
                            </Typography>
                        </Box>

                        <Alert severity="info" sx={{ mt: 2 }}>
                            Your order will be processed securely
                        </Alert>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}