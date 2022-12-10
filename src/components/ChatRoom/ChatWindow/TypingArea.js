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
                    >
                      <InsertDriveFileRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      edge="end"
                      sx={{...colorHover.greenIconBtn}}
                    >
                      <PhotoRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      edge="end"
                      sx={{...colorHover.greenIconBtn}}
                    >
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
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default TypingArea;
