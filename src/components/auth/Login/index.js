import {useState} from 'react';
import {errorCodeConverter} from 'src/firebase/authServices';
import {Link} from 'react-router-dom';
import logo from 'src/assets/logo/official/icon_color.svg';
import {
  Button,
  IconButton,
  TextField,
  Box,
  Grid,
  Divider,
  Typography,
} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {ReactComponent as FacebookIcon} from '../logo/Facebook.svg';
import {ReactComponent as GoogleIcon} from '../logo/Google.svg';
import {color, colorHover, background} from 'src/style';

import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from 'src/firebase/config';
import {
  facebookLoginHandler,
  googleLoginHandler,
} from 'src/firebase/authServices';

const theme = createTheme();

export default function SignInSide() {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({});

  const onChangeHandler = (e) => {
    e.preventDefault();

    setFormData({
      ...formData,

      [e.target.name]: e.target.value.trim(),
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const email = formData.email;
    const password = formData.password;

    if (!(email && password)) {
      setError('All fields are required.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        setError(errorCodeConverter(error.code));
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
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
          <img src={logo} atl={''} />
          <Typography component="h1" variant="h5">
            Login to your account
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={onSubmitHandler}
            sx={{
              mt: 1,
              '& .MuiInputLabel-root': {
                color: color.gray01,
                fontSize: 14,
              },
            }}
          >
            <Grid container sx={{display: 'flex', gap: 2}}>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={onChangeHandler}
                  sx={{borderWidth: 2, borderColor: 'green'}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={onChangeHandler}
                />
              </Grid>
            </Grid>

            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              sx={{
                mb: 1,
                fontSize: 12,
                '& span': {
                  color: color.gray01,
                  fontSize: 14,
                },
              }}
            /> */}
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
            >
              Login
            </Button>
            <Grid container spacing={0} justifyContent="space-around">
              <Grid item xs={5}>
                <Typography
                  variant="body2"
                  sx={{lineHeight: '40px', color: color.gray02, mt: 1}}
                >
                  <Link to="/forgot" style={{color: color.green03}}>
                    Forgot password?
                  </Link>
                </Typography>
              </Grid>

              <Grid item xs={7}>
                <Typography
                  variant="body2"
                  sx={{lineHeight: '40px', color: color.gray02, mt: 1}}
                >
                  Don't have an account?{' '}
                  <Link to="/signup" style={{color: color.green03}}>
                    {'Sign Up'}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{my: 1}}>
              <Typography variant="body2" sx={{color: color.gray02}}>
                Or continue with
              </Typography>{' '}
            </Divider>
            <Box sx={{display: 'flex', gap: 1, justifyContent: 'center'}}>
              <IconButton
                aria-label="facebook"
                variant="contained"
                onClick={() => setError(facebookLoginHandler)}
              >
                <FacebookIcon style={{width: 32, height: 32}} />
              </IconButton>
              <IconButton
                aria-label="google"
                variant="contained"
                onClick={() => setError(googleLoginHandler)}
              >
                <GoogleIcon style={{width: 32, height: 32}} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
