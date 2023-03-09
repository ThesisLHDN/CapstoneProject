import {useState} from 'react';
import {errorCodeConverter} from '../authFunction';
// import {useNavigate} from 'react-router-dom';
// import AuthContext from 'src/Context/AuthProvider';

// import Avatar from '@mui/material/Avatar';
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
import {color, colorHover} from 'src/style';

// import app, {auth} from 'src/firebase/config.js';
import {
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  getAdditionalUserInfo,
} from 'firebase/auth';
import {db, auth} from 'src/firebase/config';
import {addDocument} from 'src/firebase/services';
import {collection, addDoc} from 'firebase/firestore';

const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

const theme = createTheme();

export default function SignInSide() {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({});
  // const auth = getAuth();

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

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const data = formData;
    const email = data.email;
    const password = data.password;

    if (!(email && password)) {
      setError('All fields are required.');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(errorCodeConverter(errorCode));
      });
  };

  const facebookLoginHandler = async () => {
    // const auth = getAuth();
    signInWithPopup(auth, facebookProvider)
      .then(async (result) => {
        // The signed-in user info.
        const user = result.user;

        if (getAdditionalUserInfo(result).isNewUser) {
          try {
            // const docRef = await addDoc(collection(db, 'users'), {
            //   displayName: user.displayName,
            //   email: user.email,
            //   photoURL: user.photoURL,
            //   uid: user.uid,
            //   provider: getAdditionalUserInfo(result).providerId,
            // });
            // console.log('Document written with ID: ', docRef.id);
            addDocument('users', {
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              uid: user.uid,
              provider: getAdditionalUserInfo(result).providerId,
            });
          } catch (e) {
            console.error('Error adding document: ', e);
          }
        }

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
          try {
            // const docRef = await addDoc(collection(db, 'users'), {
            //   displayName: user.displayName,
            //   email: user.email,
            //   photoURL: user.photoURL,
            //   uid: user.uid,
            //   providerId: getAdditionalUserInfo(result).providerId,
            // });
            // console.log('Document written with ID: ', docRef.id);
            addDocument('users', {
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              uid: user.uid,
              provider: getAdditionalUserInfo(result).providerId,
            });
          } catch (e) {
            console.error('Error adding document: ', e);
          }
        }

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
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
            Login to your account
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={onSubmitHandler}
            sx={{
              // mt: 1,
              '& .MuiInputLabel-root': {
                color: color.gray01,
                fontSize: 14,
              },
            }}
          >
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onChangeHandler}
              sx={{borderWidth: 2, borderColor: 'green'}}
            />
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Enter password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChangeHandler}
            />
            <FormControlLabel
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
              sx={{...colorHover.greenBtn}}
              // href="/"
              // onClick={onSubmitHandler}
            >
              Login
            </Button>
            <Grid
              container
              sx={{lineHeight: '40px', mt: 1, color: color.gray02}}
            >
              <Grid item xs>
                <Typography variant="body2" sx={{lineHeight: 'inherit'}}>
                  <Link
                    href="/forget"
                    variant="body2"
                    sx={{color: color.green03}}
                  >
                    Forgot password?
                  </Link>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" sx={{lineHeight: 'inherit'}}>
                  Don't have an account?{' '}
                  <Link href="/signup" sx={{color: color.green03}}>
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
