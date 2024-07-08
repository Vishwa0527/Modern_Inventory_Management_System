import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, Box } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';
import { useNavigate } from 'react-router-dom';
import { Card, Grid } from '@mui/material';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const navigate = useNavigate();
  const mdUp = useResponsive('up', 'md');

  const handleDirect = () => {
    navigate('/registration', { replace: true });
  };

  return (
    <>
      <Helmet>
        <title> Login | MIMS </title>
      </Helmet>


      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 12, mt: 3, mb: 2 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/LogoX.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth='xl' >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              backgroundImage: 'url("/assets/BImage.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{ minHeight: '30vh', marginTop: '50px', marginBottom: '50px' }}
            >
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <StyledContent>
                    <Typography variant="h4" gutterBottom>
                      Sign in to MIMS
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 5 }}>
                      {/* Additional text or information */}
                    </Typography>
                    <LoginForm />
                  </StyledContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>

        <footer style={{ position: 'absolute', bottom: 0, right: 0, margin: '10px' }}>
          <Typography variant="body2" sx={{ textAlign: 'right' }}>
            All rights reserved. Developed by: Vishwa Rathnayake
          </Typography>
        </footer>
      </StyledRoot>
    </>
  );
}