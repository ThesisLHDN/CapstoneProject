import {useContext} from 'react';
// import {useNavigate} from 'react-router-dom';
// import AuthContext from 'src/Context/AuthProvider';
import {color, colorHover} from 'src/style';

import {Button, TextField, Link, Box, Grid, Typography} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme();

export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{
          background:
            'radial-gradient(farthest-corner at -100% -00%, #5DC75C, #7CC7B2, #5B69C6)',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 10,
            width: '30vw',
            px: 4,
            py: 2,
            justifySelf: 'center',
            height: 'fit-content',
          }}
        >
          <Typography component="h1" variant="h5">
            Forget Password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              mt: 1,
              '& .MuiInputLabel-root': {
                color: color.gray01,
              },
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter email"
              name="email"
              autoComplete="email"
              autoFocus
              size="small"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2, ...colorHover.greenBtn}}
            >
              Continue
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/login" variant="body2" sx={{color: color.green03}}>
                  {'Login'}
                </Link>
              </Grid>
              <Grid item xs></Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
