import React from 'react';
import {color} from 'src/style'
import {Typography, Grid, TextField, Button, Avatar} from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

function Profile() {
  return (
    <div>
      <Typography variant="h5" sx={{color: color.green03, fontWeight: 700}}>
        Account Settings
      </Typography>

      <Grid container alignItems="center" justifyContent="center">
        <Avatar
          src="X"
          sx={{
            width: '15vw',
            height: '15vw',
            backgroundColor: '#8993A4',
            fontSize: 120,
          }}
          alt="Lam Nguyen"
        />
      </Grid>

      <Grid container alignItems="center" justifyContent="center" sx={{mt: 6}}>
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
            value="Lam Nguyen"
            size="small"
            sx={{width: '100%', backgroundColor: '#ECECEC'}}
          ></TextField>
        </Grid>
      </Grid>

      <Grid container alignItems="center" justifyContent="center" sx={{mt: 3}}>
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
            value="lamngngng@gmail.com"
            size="small"
            sx={{
              width: '100%',
              backgroundColor: '#ECECEC',
            }}
          ></TextField>
        </Grid>
      </Grid>

      <Grid container alignItems="center" justifyContent="center" sx={{mt: 3}}>
        <Grid item xs={2}>
          <Typography
            sx={{
              display: 'flex',
              color: color.green03,
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            <PhoneEnabledOutlinedIcon
              sx={{marginRight: 2, width: 24, height: 24}}
            />
            Phone number
          </Typography>
        </Grid>

        <Grid item xs={3.5} alignItems="center" justifyContent="center">
          <TextField
            value="0123456789"
            size="small"
            sx={{width: '100%', backgroundColor: '#ECECEC'}}
          ></TextField>
        </Grid>
      </Grid>

      <Grid container alignItems="center" justifyContent="center" sx={{mt: 2}}>
        <Grid item xs={3}>
          <Button
            variant="text"
            startIcon={
              <LockOutlinedIcon sx={{marginRight: 1, width: 24, height: 24}} />
            }
            sx={{
              color: color.green03,
              textTransform: 'none',
              fontSize: 16,
              fontWeight: 700,
              paddingX: 2,
              marginTop: 1,
            }}
          >
            Change password
          </Button>
        </Grid>
        <Grid item xs={2.75}></Grid>
      </Grid>

      <Grid container alignItems="center" justifyContent="center" sx={{mt: 2}}>
        <Grid item xs={3}>
          <Button
            variant="text"
            startIcon={
              <DeleteOutlineIcon sx={{marginRight: 1, width: 24, height: 24}} />
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
      </Grid>
    </div>
  );
}

export default Profile;
