import {useState} from 'react';
import {errorCodeConverter} from 'src/firebase/authFunction';

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

import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from 'src/firebase/config';
import {setDocument} from 'src/firebase/firestoreServices';
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
