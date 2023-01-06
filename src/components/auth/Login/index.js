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
} from 'firebase/auth';

const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

const theme = createTheme();

export default function SignInSide() {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({});
  const auth = getAuth();
  // const {user} = useContext(AuthContext);
  const errorCodeHandler = (err) => {
    if (err === 'auth/wrong-password') {
      setError('Wrong password');
    } else if (err === 'auth/invalid-email') {
      setError('Invalid email');
    } else if (err === 'auth/user-not-found') {
      setError('User not found');
    } else {
      setError(err);
    }
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

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const data = formData;
    const email = data.email;
    const password = data.password;
    // console.log({
    //   email: email,
    //   password: password,
    // });
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

  const facebookLoginHandler = () => {
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
              Login to your account
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={onSubmitHandler}
              sx={{
                mt: 1,
                '& .MuiInputLabel-root': {
                  color: color.green03,
                },
              }}
            >
              <TextField
                size="small"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Enter password"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                size="small"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2, ...colorHover.greenBtn}}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forget" variant="body2" sx={{color:color.green03}}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    Don't have an account?{' '}
                    <Link href="/signup" sx={{color:color.green03}}>{'Sign Up'}</Link>
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
            minWidth: 400,
            px: 4,
            py: 2,
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
              mt: 1,
              '& .MuiInputLabel-root': {
                color: color.green03,
              },
            }}
          >
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter password"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onChangeHandler}
            />
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChangeHandler}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {error && (
              <Typography
                variant="subtitle2"
                sx={{color: 'red', textAlign: 'center'}}
              >
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2, ...colorHover.greenBtn}}
              // href="/"
              // onClick={onSubmitHandler}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Typography variant="body2">
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
                <Typography variant="body2">
                  Don't have an account?{' '}
                  <Link href="/signup" sx={{color: color.green03}}>
                    {'Sign Up'}
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
