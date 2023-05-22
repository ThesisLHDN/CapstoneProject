import { useState } from 'react';
import { color, colorHover } from 'src/style';
import { errorCodeConverter } from 'src/firebase/authServices';

import { Button, TextField, Link, Box, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { auth } from 'src/firebase/config';
import { sendPasswordResetEmail } from 'firebase/auth';

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
              size="small"
              margin="normal"
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
                  href="/login"
                  variant="body2"
                  sx={{mt: 2, color: color.green03}}
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
