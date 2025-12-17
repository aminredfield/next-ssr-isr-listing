import type { ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ThemeRegistry } from '../src/components';

export const metadata = {
  title: {
    default: 'Product Catalogue',
    template: '%s | Product Catalogue',
  },
  description:
    'Modern product catalogue with SSR and ISR powered by Next.js',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <ThemeRegistry>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="sticky" color="primary" elevation={1}>
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
                  Product Catalogue
                </Typography>
              </Toolbar>
            </AppBar>

            <Container
              component="main"
              maxWidth="xl"
              sx={{
                flexGrow: 1,
                py: 4,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {children}
            </Container>

            <Box
              component="footer"
              sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor:"grey.100"
              }}
            >
              <Container maxWidth="xl">
                <Typography variant="body2" color="text.secondary" align="center">
                  Built with Next.js and Material UI
                </Typography>
              </Container>
            </Box>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}