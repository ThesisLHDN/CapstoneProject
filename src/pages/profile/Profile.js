import {useContext, Suspense} from 'react';
import {AuthContext} from 'src/Context/AuthProvider';
import {color} from 'src/style';
import {Typography, Grid, TextField, Avatar} from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

function Profile() {
  const {
    user: {displayName, email, photoURL, uid},
  } = useContext(AuthContext);

  // const users = useFirestore('users', {
  //   fieldName: 'uid',
  //   operator: '==',
  //   compareValue: uid,
  // });
  // const user = users[0];
  // const user = useFirestoreDoc('users', uid);
  // console.log(user);

  // console.log('usedoc', user);

  // const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate('/forget');
  // };

  return (
    <div style={{marginLeft: '-15vw'}}>
      <Typography variant="h5" sx={{color: color.green03, fontWeight: 700}}>
        Account Settings
      </Typography>
      <Suspense fallback={<div>Loading...</div>}>
        <Grid container alignItems="center" justifyContent="center">
          <Avatar
            src={photoURL}
            sx={{
              width: '15vw',
              height: '15vw',
              backgroundColor: '#8993A4',
              fontSize: 120,
            }}
            alt={displayName}
          />
        </Grid>

        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{mt: 6}}
        >
          <Grid item xs={2}>
            <Typography
              sx={{
                display: 'flex',
                color: color.green03,
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              <DriveFileRenameOutlineIcon
                sx={{marginRight: 2, width: 24, height: 24}}
              />
              Name
            </Typography>
          </Grid>

          <Grid item xs={3.5}>
            <TextField
              hiddenLabel
              value={displayName}
              size="small"
              sx={{width: '100%', backgroundColor: '#ECECEC'}}
            ></TextField>
          </Grid>
        </Grid>

        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{mt: 3}}
        >
          <Grid item xs={2}>
            <Typography
              sx={{
                display: 'flex',
                color: color.green03,
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              <EmailOutlinedIcon sx={{marginRight: 2, width: 24, height: 24}} />
              Email
            </Typography>
          </Grid>

          <Grid item xs={3.5}>
            <TextField
              value={email}
              size="small"
              disabled
              sx={{
                width: '100%',
                backgroundColor: '#ECECEC',
              }}
            ></TextField>
          </Grid>
        </Grid>

        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{mt: 2}}
        >
          {/* <Grid item xs={3}>
              <Button
                variant="text"
                startIcon={
                  <LockOutlinedIcon
                    sx={{marginRight: 1, width: 24, height: 24}}
                  />
                }
                sx={{
                  color: color.green03,
                  textTransform: 'none',
                  fontSize: 16,
                  fontWeight: 700,
                  paddingX: 2,
                  marginTop: 1,
                }}
                onClick={handleClick}
              >
                Change password
              </Button>
            </Grid> */}
          <Grid item xs={2.75}></Grid>
        </Grid>

        {/* <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{mt: 2}}
          >
            <Grid item xs={3}>
              <Button
                variant="text"
                startIcon={
                  <DeleteOutlineIcon
                    sx={{marginRight: 1, width: 24, height: 24}}
                  />
                }
                sx={{
                  color: 'red',
                  textTransform: 'none',
                  fontSize: 16,
                  fontWeight: 700,
                  paddingX: 2,
                  marginTop: 1,
                }}
              >
                Log out
              </Button>
            </Grid>
            <Grid item xs={2.75}></Grid>
          </Grid> */}
      </Suspense>
    </div>
  );
}

export default Profile;
