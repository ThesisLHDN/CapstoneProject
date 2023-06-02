import {useState} from 'react';
import {color, colorHover, background} from 'src/style';
import {errorCodeConverter} from 'src/firebase/authServices';
import {Link} from 'react-router-dom';
import {Button, TextField, Box, Grid, Typography} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {auth} from 'src/firebase/config';
import {sendPasswordResetEmail} from 'firebase/auth';
import logo from 'src/assets/logo/official/icon_color.svg';

const theme = createTheme();

export default function SignInSide() {
  const [error, setError] = useState();
  const [email, setEmail] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('forget ', email);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setError('Password reset email has been sent to ' + email);
      })
      .catch((error) => {
        setError(errorCodeConverter(error.code));
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component={'main'}
        sx={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          ...background.landingBG,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 10,
            width: '30vw',
            minWidth: 460,
            p: 4,
            justifySelf: 'center',
            height: 'fit-content',
          }}
        >
          {' '}
          <img src={logo} atl={''} />
          <Typography component="h1" variant="h5">
            Forgot Password
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
              size="small"
              required
              fullWidth
              id="email"
              label="Enter email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              sx={{borderWidth: 2, borderColor: 'green'}}
            />
            {error && (
              <Typography
                variant="subtitle2"
                sx={{color: 'red', textAlign: 'center', mb: 2}}
              >
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 2, ...colorHover.greenGradBtn}}
              onClick={handleSubmit}
            >
              Send reset password email
            </Button>
            <Grid
              container
              sx={{lineHeight: '40px', mt: 1, color: color.gray02}}
            >
              <Grid item xs></Grid>
              <Grid item>
                <Link
                  to="/login"
                  variant="body2"
                  style={{mt: 2, color: color.green03}}
                >
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
