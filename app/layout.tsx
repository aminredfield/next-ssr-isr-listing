import type { ReactNode } from 'react';
import { ThemeRegistry } from '../src/components/ThemeRegistry';
import { Header } from '../src/components/Header';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
            <Header />

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
                backgroundColor: "grey.100"
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