import { Helmet } from 'react-helmet-async';
import React from 'react';
import { Typography, Container, Grid, Box, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(4),
        borderRadius: theme.shape.borderRadius,
    },
    socialMedia: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(4),
    },
    socialMediaIcon: {
        marginRight: theme.spacing(2),
    },
}));

// ----------------------------------------------------------------------

export default function AboutPage() {
    const classes = useStyles();

    return (
        <>
            <Helmet>
                <title>About | GrateFulDonors</title>
            </Helmet>

            <Container>
                <Box py={4}>
                    <Typography variant="h4" gutterBottom>
                        About Our Donation Website
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1" paragraph>
                                Welcome to our donation website! We are dedicated to making a positive impact on the world by providing a platform for individuals and organizations to contribute to various causes and make a difference in people's lives.
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Our mission is to connect generous donors with reputable charities and initiatives. We believe that every contribution counts, no matter how big or small, and together we can create a better future for those in need.
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Through our user-friendly platform, you can explore different causes, learn about their impact, and make secure donations online. We strive to ensure transparency and accountability in every step of the process, so you can trust that your donations are reaching the intended recipients.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <img src={process.env.PUBLIC_URL + "/assets/Logo.png"} alt="About" style={{ width: '100%', borderRadius: 4 }} />
                        </Grid>
                    </Grid>
                </Box>

                <Box py={4}>
                    <Typography variant="h5" gutterBottom>
                        Contact Us
                    </Typography>
                    <Typography variant="body1" paragraph>
                        If you have any questions or inquiries, please feel free to contact us:
                    </Typography>
                    <Typography variant="body1">
                        <b>Email: GratefulDonors@gmail.com</b>
                    </Typography>
                    <Typography variant="body1">
                        <b>Phone: 123-456-7890</b>
                    </Typography>
                </Box>

                <Box className={classes.socialMedia}>
                    <Link href="https://example.com/facebook" target="_blank" rel="noopener" className={classes.socialMediaIcon} style={{ width: '50px', height: '50px' }} >
                        <img src={process.env.PUBLIC_URL + "/assets/logo-facebookpng-32204.png"} alt="Facebook" />
                    </Link>
                    <Link href="https://example.com/twitter" target="_blank" rel="noopener" className={classes.socialMediaIcon} style={{ width: '50px', height: '50px' }}>
                        <img src={process.env.PUBLIC_URL + "/assets/logo-twitter-png-5860.png"} alt="Twitter" />
                    </Link>
                    <Link href="https://example.com/instagram" target="_blank" rel="noopener" className={classes.socialMediaIcon} style={{ width: '50px', height: '50px' }}>
                        <img src={process.env.PUBLIC_URL + "/assets/logo-ig-png-32464.png"} alt="Instagram" />
                    </Link>
                </Box>

            </Container>
        </>
    );
}
