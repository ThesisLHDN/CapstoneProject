import {useState} from 'react';
import {color, colorHover} from 'src/style';
import {errorCodeConverter} from 'src/firebase/authFunction';

import {
  Button,
  IconButton,
  TextField,
  Link,
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
    const fName = formData.firstName;
    const lName = formData.lastName;

    if (!(email, password, fName, lName)) {
      setError('All fields are required.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        const newUser = {...user, displayName: `${fName} ${lName}`};
        // console.log(newUser);

        addNewUser(newUser, getAdditionalUserInfo(userCredential).providerId);
        // setUserData(newUser);
      })
      .then(() =>
        updateProfile(auth.currentUser, {
          displayName: `${fName} ${lName}`,
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
          background:
            'radial-gradient(farthest-corner at -100% -00%, #5DC75C, #7CC7B2, #5B69C6)',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
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
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={signUpHandler}
            sx={{
              // mt: 1,
              '& .MuiInputLabel-root': {
                color: color.gray01,
                fontSize: 14,
              },
            }}
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
              sx={{mt: 2, ...colorHover.greenBtn}}
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
                  <Link href="/login" sx={{color: color.green03}}>
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
                variant="contained"
                onClick={() => setError(facebookLoginHandler)}
              >
                <FacebookIcon style={{width: 32, height: 32}} />
              </IconButton>
              <IconButton
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
