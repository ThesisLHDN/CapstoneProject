import React from 'react';
import {colorHover} from 'src/style';

import {
  Button,
  IconButton,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Divider,
  Typography,
} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {ReactComponent as FacebookIcon} from '../logo/Facebook.svg';
import {ReactComponent as GoogleIcon} from '../logo/Google.svg';

// import app, {auth} from 'src/firebase/config.js';
import {
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

const theme = createTheme();

export default function SignInSide() {
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [formData, setFormData] = React.useState({});

  const facebookLoginHandler = () => {
    const auth = getAuth();
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
      });
  };

  const googleLoginHandler = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
      });
  };

  const onChangeHandler = (e) => {
    e.preventDefault();

    console.log(e.target.name);
    console.log(e.target.value);
    setFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });

    // setFormData()
  };

  const signUpHandler = (event) => {
    event.preventDefault();
    console.log(formData);
    const auth = getAuth();
    const email = formData.email;
    const password = formData.password;
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        setErrorMessage(error.code);
      });
  };
  return (
    <ThemeProvider theme={theme}>
      {/* <Grid container component="main" sx={{height: '100vh'}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{mt: 3}}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={onChangeHandler}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={onChangeHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={onChangeHandler}
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
                    autoComplete="new-password"
                    onChange={onChangeHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              {errorMessage && <Typography>{errorMessage}</Typography>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2, ...colorHover.greenBtn}}
                onClick={signUpHandler}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Typography variant="body2">
                    Already have an account?{' '}
                    <Link href="/login" sx={{color:'green'}}>{'Login'}</Link>
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{my: 1}}>
                <Typography variant="body2">Or continue with</Typography>{' '}
              </Divider>
              <Box sx={{display: 'flex', gap: 1, justifyContent: 'center'}}>
                <IconButton variant="contained" onClick={facebookLoginHandler}>
                  <FacebookIcon style={{width: 32, height: 32}} />
                </IconButton>
                <IconButton variant="contained" onClick={googleLoginHandler}>
                  <GoogleIcon style={{width: 32, height: 32}} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid> */}
      <Grid
        container
        component="main"
        sx={{
          background: 'radial-gradient(farthest-corner at -100% -00%, #5DC75C, #7CC7B2, #5B69C6)',
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={onChangeHandler}
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
                  autoComplete="new-password"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            {errorMessage && <Typography>{errorMessage}</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2, ...colorHover.greenBtn}}
              onClick={signUpHandler}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Link href="/login" sx={{color: 'green'}}>
                    {'Login'}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{my: 1}}>
              <Typography variant="body2">Or continue with</Typography>{' '}
            </Divider>
            <Box sx={{display: 'flex', gap: 1, justifyContent: 'center'}}>
              <IconButton variant="contained" onClick={facebookLoginHandler}>
                <FacebookIcon style={{width: 32, height: 32}} />
              </IconButton>
              <IconButton variant="contained" onClick={googleLoginHandler}>
                <GoogleIcon style={{width: 32, height: 32}} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
