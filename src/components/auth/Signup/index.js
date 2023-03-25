import {useState} from 'react';
import {color, colorHover} from 'src/style';
import {errorCodeConverter} from '../authFunction';

import {
  Button,
  IconButton,
  TextField,
  FormControlLabel,
  Checkbox,
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
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  getAdditionalUserInfo,
} from 'firebase/auth';

import {auth} from 'src/firebase/config';
import {addDocument, setDocument} from 'src/firebase/services';

const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

const theme = createTheme();

export default function SignInSide() {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({});
  const [userData, setUserData] = useState({});

  const addNewUser = async (user, provider) => {
    setDocument(
      'users',
      {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        provider,
      },
      user.uid,
      'create',
    ).then(() => {
      addDocument('workspaces', {
        name: user.displayName + "'s workspace",
        adminId: user.uid,
        adminEmail: user.email,
      });
    });
    console.log('add new user');
  };

  const facebookLoginHandler = async () => {
    // const auth = getAuth();
    signInWithPopup(auth, facebookProvider)
      .then(async (result) => {
        // The signed-in user info.
        const user = result.user;

        if (getAdditionalUserInfo(result).isNewUser) {
          addNewUser(user, getAdditionalUserInfo(result).providerId);
        }
        setUserData(user);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        // console.log('credential: ', credential);
        const accessToken = credential.accessToken;
      })
      .catch((error) => {
        // Handle Errors here.
        setError(errorCodeConverter(error.code));
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = FacebookAuthProvider.credentialFromError(error);
      });
    // console.log('Login facebook', {data});
  };

  const googleLoginHandler = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        // The signed-in user info.

        const user = result.user;
        if (getAdditionalUserInfo(result).isNewUser) {
          addNewUser(user, getAdditionalUserInfo(result).providerId);
          console.log('sign up google', userData);
        }
        setUserData(result.user);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const accessToken = credential.accessToken;
      })
      .catch((error) => {
        // Handle Errors here.
        setError(errorCodeConverter(error.code));
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const onChangeHandler = (e) => {
    e.preventDefault();

    // console.log(e.target.name + ': ' + e.target.value);
    setFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const createFirstWorkspace = (displayName, id) => {
    addDocument('workspaces', {
      name: displayName + "'s workspace",
      adminId: id,
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

    console.log(auth.currentUser);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        addNewUser(user, getAdditionalUserInfo(userCredential).providerId);
        setUserData(user);

        console.log(user);
      })
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
              mt: 3,
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
              <Grid item xs={12}>
                <FormControlLabel
                  sx={{
                    mb: 2,
                    '& span': {
                      color: color.gray01,
                      fontSize: 14,
                    },
                  }}
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
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
              sx={{...colorHover.greenBtn}}
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
