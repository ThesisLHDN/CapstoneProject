import React from 'react';

import {
  InputAdornment,
  IconButton,
  TextField,
  Button,
  Grid,
  Divider,
} from '@mui/material';
import PhotoRoundedIcon from '@mui/icons-material/PhotoRounded';
import SmartDisplayRoundedIcon from '@mui/icons-material/SmartDisplayRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import SendRoundedIcon from '@mui/icons-material/Send';

import {colorHover} from 'src/style';

function TypingArea() {
  return (
    <>
      <Divider variant="middle" sx={{mb: 2, borderBottom: 2}}></Divider>
      <Grid container spacing={2} sx={{bottom: '0px', width: '100%'}}>
        <Grid item xs={10}>
          <TextField
            size="small"
            placeholder="Aa"
            sx={{width: '100%'}}
            InputProps={{
              endAdornment: (
                <>
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      edge="end"
                      sx={{...colorHover.greenIconBtn}}
                      component="label"
                    >
                      <input hidden accept="*" multiple type="file" />
                      <InsertDriveFileRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      edge="end"
                      sx={{...colorHover.greenIconBtn}}
                      component="label"
                    >
                      <input hidden accept="image/*" type="file" />
                      <PhotoRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      edge="end"
                      sx={{...colorHover.greenIconBtn}}
                      component="label"
                    >
                      <input hidden accept="video/*" multiple type="file" />
                      <SmartDisplayRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                </>
              ),
            }}
          ></TextField>
        </Grid>{' '}
        <Grid item xs={2}>
          <Button
            variant="contained"
            sx={{width: '100%', height: '100%', ...colorHover.greenBtn}}
            endIcon={<SendRoundedIcon />}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default TypingArea;
