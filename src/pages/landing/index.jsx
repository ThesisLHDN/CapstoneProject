import React from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import { background, colorHover } from 'src/style';
import { Link } from 'react-router-dom';
import logo from 'src/assets/logo/official/full_white.svg';
import illu from 'src/assets/images/landing_illu.svg';

function Landing() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        ...background.landingBG,
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          // height: 'fit-content',
          width: '80%',
        }}
      >
        <Grid
          item
          xs={5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <img src={logo} width="100%" height="80" alt="Logo" />
          <Typography
            variant="body1"
            sx={{ fontSize: 20, color: 'white', textAlign: 'justify' }}
          >
            Stay agile, self-organize, and deliver exceptional software products
            with our Agile project management software. Empowering
            project teams, we offer the tools you need to streamline workflows,
            foster collaboration, and achieve outstanding results. Experience
            the future of Agile project management today.
            {/* Proin tempus nec enim sed vulputate. Fusce ac
            mi viverra, imperdiet neque id, sollicitudin nulla. Sed tincidunt
            auctor purus, congue semper tortor finibus eget. */}
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              {' '}
              <Link style={{ width: '100%' }} to="/signup">
                <Button
                  variant="outlined"
                  sx={{
                    height: 48,
                    fontSize: 16,
                    width: '100%',
                    ...colorHover.whiteOutlineBtn,
                  }}
                >
                  Sign up for free
                </Button>
              </Link>{' '}
            </Grid>
            <Grid item xs={6}>
              {' '}
              <Link style={{ width: '100%' }} to="/login">
                <Button
                  variant="contained"
                  sx={{
                    height: 48,
                    fontSize: 16,
                    width: '100%',
                    ...colorHover.greenBtn,
                  }}
                >
                  Login to your account
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={7} sx={{ width: '56%' }}>
          <img src={illu} width="750" alt="Logo" />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Landing;
