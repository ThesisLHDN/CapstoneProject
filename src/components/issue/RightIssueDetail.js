import React from 'react'
import { Typography, Grid, LinearProgress, TextField, Avatar } from "@mui/material"
import TagsInput from './tags-input/TagsInput'

function RightIssueDetail() {
  return (
    <div className='pl-5'>
      <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "Open Sans, sans-serif" }}>
        Details
      </Typography>

      <Grid container spacing={2} sx={{ marginTop: 3, border: "solid 1px #B4B4B4", borderRadius: 1 }}>
        <Grid container sx={{ marginTop: 2 }}>
          <Grid item xs={5}>
            <Typography sx={{ marginTop: 1, marginLeft: 2, fontSize: 14, fontWeight: 700 }}>
              Time Tracking
            </Typography>
          </Grid>
          <Grid item xs={6.5}>
            <LinearProgress 
              variant="determinate" 
              value={60}
              color="success"
              sx={{ marginTop: 2, marginBottom: 3, fontSize: 14, fontWeight: 700, width: "100%" }}
            />
          </Grid>
        </Grid>

        <Grid container sx={{ marginTop: 1 }}>
          <Grid item xs={5}>
            <Typography sx={{ marginTop: 1, marginLeft: 2, fontSize: 14, fontWeight: 700 }}>
              Assignee
            </Typography>
          </Grid>
          <Grid item xs={6.5}>
            <div className='flex mt-1'>
              <Avatar
                src="X"
                sx={{ width: 32, height: 32, backgroundColor: "#8993A4" }}
                alt="Lâm Nguyễn"
              />
              <span className='mt-1 ml-2 text-sm'>Lâm Nguyễn</span>
            </div>
          </Grid>
        </Grid>

        <Grid container sx={{ marginTop: 1 }}>
          <Grid item xs={5}>
            <Typography sx={{ marginTop: 2, marginLeft: 2, fontSize: 14, fontWeight: 700 }}>
              Tags
            </Typography>
          </Grid>
          <Grid item xs={6.5}>
            <div className='mt-3'>
              <TagsInput tags={['Nodejs', 'UI/UX']} />
            </div>
          </Grid>
        </Grid>

        <Grid container sx={{ marginTop: 1 }}>
          <Grid item xs={5}>
            <Typography sx={{ marginTop: 2.4, marginLeft: 2, fontSize: 14, fontWeight: 700 }}>
              Story Point Estimate
            </Typography>
          </Grid>
          <Grid item xs={6.5}>
            <TextField
              variant="standard"
              placeholder='None'
              size="small"
              sx={{ marginTop: 2.4, width: "100%" }}
              InputProps={{ disableUnderline: true, style: { fontSize: 14 }}}
            ></TextField>
          </Grid>
        </Grid>

        <Grid container sx={{ marginTop: 1, marginBottom: 2 }}>
          <Grid item xs={5}>
            <Typography sx={{ marginTop: 2.5, marginLeft: 2, fontSize: 14, fontWeight: 700 }}>
              Reporter
            </Typography>
          </Grid>
          <Grid item xs={6.5}>
            <div className='flex mt-3'>
              <Avatar
                src="X"
                sx={{ width: 32, height: 32, backgroundColor: "#8993A4" }}
                alt="Lâm Nguyễn"
              />
              <span className='mt-2 ml-2 text-sm'>Lâm Nguyễn</span>
            </div>
          </Grid>
        </Grid>

        {/* <Grid item xs={5}>
          
          <div className='flex mt-3'>
            <Avatar
              src="X"
              sx={{ width: 32, height: 32, backgroundColor: "#8993A4" }}
              alt="Lâm Nguyễn"
            />
            <span className='mt-2 ml-2 text-sm'>Lâm Nguyễn</span>
          </div>
        </Grid>
        
        <Grid item xs={5}>
          <Typography sx={{ marginTop: 3, fontSize: 14, fontWeight: 700 }}>
            Tags
          </Typography>
          <div className='mt-4'>
            <TagsInput tags={['Nodejs', 'UI/UX']} />
          </div>
        </Grid>

        <Grid item xs={5}>
          <Typography sx={{ marginTop: 3, fontSize: 14, fontWeight: 700 }}>
            Story Point Estimate
          </Typography>
          <TextField
            variant="standard"
            placeholder='None'
            size="small"
            sx={{ marginTop: 2, width: "100%", paddingTop: 0.25 }}
            InputProps={{ disableUnderline: true, style: { fontSize: 14 }}}
          ></TextField>
        </Grid>


        <Grid item xs={5}>
          <Typography sx={{ marginY: 3, fontSize: 14, fontWeight: 700 }}>
            Reporter
          </Typography>
          <div className='flex mt-3'>
            <Avatar
              src="X"
              sx={{ width: 32, height: 32, backgroundColor: "#8993A4" }}
              alt="Lâm Nguyễn"
            />
            <span className='mt-2 ml-2 text-sm'>Lâm Nguyễn</span>
          </div>
        </Grid> */}

        {/* <Grid item xs={5}>
          <Typography sx={{ marginTop: 1, fontSize: 14, fontWeight: 700 }}>
            Time Tracking
          </Typography>
          <Typography sx={{ marginTop: 3, fontSize: 14, fontWeight: 700 }}>
            Assignee
          </Typography>
          <Typography sx={{ marginTop: 3, fontSize: 14, fontWeight: 700 }}>
            Tags
          </Typography>
          <Typography sx={{ marginTop: 3, fontSize: 14, fontWeight: 700 }}>
            Story Point Estimate
          </Typography>
          <Typography sx={{ marginY: 3, fontSize: 14, fontWeight: 700 }}>
            Reporter
          </Typography>
        </Grid>

        <Grid item xs={6.5}>
          <LinearProgress 
            variant="determinate" 
            value={80}
            color="success"
            sx={{ marginTop: 2, marginBottom: 3, fontSize: 14, fontWeight: 700, width: "100%" }}
          />
          <div className='flex mt-3'>
            <Avatar
              src="X"
              sx={{ width: 32, height: 32, backgroundColor: "#8993A4" }}
              alt="Lâm Nguyễn"
            />
            <span className='mt-2 ml-2 text-sm'>Lâm Nguyễn</span>
          </div>
          <div className='mt-4'>
            <TagsInput tags={['Nodejs', 'UI/UX']} />
          </div>
          <TextField
            variant="standard"
            placeholder='None'
            size="small"
            sx={{ marginTop: 2, width: "100%", paddingTop: 0.25 }}
            InputProps={{ disableUnderline: true, style: { fontSize: 14 }}}
          ></TextField>
          <div className='flex mt-3'>
            <Avatar
              src="X"
              sx={{ width: 32, height: 32, backgroundColor: "#8993A4" }}
              alt="Lâm Nguyễn"
            />
            <span className='mt-2 ml-2 text-sm'>Lâm Nguyễn</span>
          </div>
        </Grid> */}
      </Grid>
    </div>
  )
}

export default RightIssueDetail