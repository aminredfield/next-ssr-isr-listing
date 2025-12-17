'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import type { Order } from '../../../src/types/order';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    } else {
      // Если нет заказа, перенаправляем на главную
      router.push('/');
    }
  }, [router]);

  if (!order) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 5,
          textAlign: 'center',
          maxWidth: 600,
        }}
      >
        <CheckCircleOutlineIcon
          sx={{
            fontSize: 100,
            color: 'success.main',
            mb: 2,
          }}
        />

        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Order Placed Successfully!
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          Thank you for your purchase. Your order has been confirmed.
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            my: 3,
            backgroundColor: 'grey.50',
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Order Details
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Order Number:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
              {order.orderNumber}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Date:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {new Date(order.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Total Amount:
            </Typography>
            <Typography variant="body2" color="primary" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
              ${order.totalPrice.toFixed(2)}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Items Ordered:
            </Typography>
            {order.items.map((item, index) => (
              <Typography key={index} variant="body2" sx={{ ml: 2, mb: 0.5 }}>
                • {item.title} (×{item.quantity}) - ${(item.price * item.quantity).toFixed(2)}
              </Typography>
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Delivery Address:
            </Typography>
            <Typography variant="body2" sx={{ ml: 2 }}>
              {order.formData.firstName} {order.formData.lastName}
              <br />
              {order.formData.address}
              <br />
              {order.formData.city}, {order.formData.postalCode}
              <br />
              {order.formData.country}
            </Typography>
          </Box>
        </Paper>

        <Typography variant="body2" color="text.secondary" paragraph sx={{ my: 3 }}>
          A confirmation email has been sent to{' '}
          <strong>{order.formData.email}</strong>
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
          Thank You for Shopping With Us! 🎉
        </Typography>

        <Typography variant="body2" color="text.secondary" paragraph>
          We appreciate your business and hope you enjoy your purchase.
          Feel free to explore more products or return to the homepage.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'center' }}>
          <Button
            component={Link}
            href="/"
            variant="outlined"
            size="large"
            startIcon={<HomeIcon />}
          >
            Home
          </Button>
          <Button
            component={Link}
            href="/products"
            variant="contained"
            size="large"
            startIcon={<ShoppingBagIcon />}
          >
            Continue Shopping
          </Button>
        </Box>

        <Box sx={{ mt: 4, p: 2, backgroundColor: 'primary.50', borderRadius: 2 }}>
          <Typography variant="caption" color="text.secondary">
            💡 This is a demo project showcasing modern e-commerce features
            <br />
            Built with Next.js 14, Material UI, and TypeScript
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}