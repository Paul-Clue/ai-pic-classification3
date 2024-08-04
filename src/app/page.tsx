'use client';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';

export default function Home() {
  return (
    <ThemeProvider theme={createTheme()}>
      <Container
        component='main'
        maxWidth='md'
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '24px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '24px',
            // border: '1px solid red',
          }}
        >
          <Box
            component='div'
            sx={{
              fontWeight: 'bold',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant='h1'
              component='h1'
              sx={{
                fontSize: '2.125rem',
                fontWeight: 'bold',
              }}
            >
              Welcome to
            </Typography>
            <Typography
              variant='h1'
              component='h1'
              sx={{ fontWeight: 'bold', fontSize: '4.3rem' }}
            >
              Picture ID
            </Typography>
            <br />
            <br />
            <Typography
              variant='h2'
              component='h2'
              sx={{
                fontWeight: 'normal',
                fontSize: '1.5rem',
                textAlign: 'center',
              }}
            >
              Software for identifying whether or not an item is a consumer good
            </Typography>
          </Box>
        </Box>
        <Box
          component='div'
          sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}
        >
          <Button variant='contained'>
            <Link href={'/login'}>Login</Link>
          </Button>
          <Button variant='contained'>
            <Link href={'/signup'}>Sign up</Link>
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
