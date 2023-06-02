import {useState} from 'react';
import {color, colorHover} from 'src/style';
import {errorCodeConverter} from 'src/firebase/authFunction';
import {Link} from 'react-router-dom';
import logo from 'src/assets/logo/official/icon_color.svg';
import {
  Button,
  IconButton,
  TextField,
  // Link,
  Box,
  Grid,
  Divider,
  Typography,
} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {ReactComponent as FacebookIcon} from '../logo/Facebook.svg';
import {ReactComponent as GoogleIcon} from '../logo/Google.svg';
import {
  addNewUser,
  facebookLoginHandler,
  googleLoginHandler,
} from 'src/firebase/authServices';
import {background} from 'src/style';

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  getAdditionalUserInfo,
  updateProfile,
} from 'firebase/auth';

import {auth} from 'src/firebase/config';

const theme = createTheme();

export default function SignInSide() {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({});
  // const [userData, setUserData] = useState({});

  const onChangeHandler = (e) => {
    e.preventDefault();

    setFormData({
      ...formData,

      [e.target.name]: e.target.value.trim(),
    });
  };

  const signUpHandler = (event) => {
    event.preventDefault();
    const email = formData.email;
    const password = formData.password;
    const displayName = formData.displayName;
    // const lName = formData.lastName;

    if (!(email, password, displayName)) {
      setError('All fields are required.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const newUser = {...user, displayName: displayName};
        addNewUser(newUser, getAdditionalUserInfo(userCredential).providerId);
      })
      .then(() =>
        updateProfile(auth.currentUser, {
          displayName: displayName,
        }),
      )
      .then(() => {
        sendEmailVerification(auth.currentUser).then(() => {
          console.log('Email verification sent!');
        });
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={signUpHandler}
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
                  autoComplete="given-name"
                  name="displayName"
                  required
                  fullWidth
                  id="displayName"
                  label="Display Name"
                  autoFocus
                  onChange={onChangeHandler}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
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
              </Grid> */}
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
                  autoComplete="new-password"
                  onChange={onChangeHandler}
                />
              </Grid>
            </Grid>
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
              Sign Up
            </Button>
            <Grid container justifyContent="space-around">
              <Grid item>
                <Typography
                  variant="body2"
                  sx={{lineHeight: '40px', color: color.gray02, mt: 1}}
                >
                  
                  Already have an account?{' '}
                  <Link to="/login" style={{color: color.green03}}>
                    {'Login'}
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
