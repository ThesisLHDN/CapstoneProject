import React, { useState } from 'react'
import DatePicker from "react-datepicker"
import { Grid, Typography, Button, TextField } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import "react-datepicker/dist/react-datepicker.css"
import Comments from './comment/Comments'

function LeftIssueDetail() {
  const [startDate, setStartDate] = useState(new Date())
  
  return (
    <div className='pr-10'>
      <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "Open Sans, sans-serif" }}>
        Fix UI for Login Page
      </Typography>

      <Grid container sx={{ display: "flex", marginTop: 3 }}>
        <Button 
          style={{ 
            display: "flex",
            textTransform: "none",
            height: 34,
            borderRadius: 3,
            // backgroundColor: `${props.item.status == "Done" ? "#A4E7AB" : (props.item.status == "In progress" ? "#9AD1EF" : "#EDCBB9")}`,
            // color: `${props.item.status == "Done" ? "#009606" : (props.item.status == "In progress" ? "#006BA7" : "#EC6F28")}`
            backgroundColor: "#9AD1EF",
            color: "#006BA7"
          }} >
          {/* {props.item.status} */}
          In Progress
          <ExpandMoreIcon />
        </Button>

        <Button 
          style={{ 
            display: "flex",
            textTransform: "none",
            height: 34,
            borderRadius: 3,
            marginLeft: "20px",
            backgroundColor: "#EFEFEF",
            color: "black",
          }} >
          <AttachFileIcon sx={{ rotate: "45deg", marginRight: 1 }}/>
          Attach
        </Button>

        <Button 
          style={{ 
            display: "flex",
            textTransform: "none",
            height: 34,
            borderRadius: 3,
            marginLeft: "20px",
            backgroundColor: "#EFEFEF",
            color: "black"
          }}>
          <LibraryAddIcon sx={{ marginRight: 1 }}/>
          Add Child Issue
        </Button>
      </Grid>

      <Typography sx={{ marginTop: 3, fontSize: 16, fontWeight: 700 }}>
        Description
      </Typography>

      <Typography sx={{ marginTop: 1, fontSize: 14, textAlign: "justify"}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        pellentesque justo quam, eget mattis nisl pellentesque sed. In
        odio urna, laoreet mattis tempor quis, consectetur ut massa.
        Phasellus pharetra finibus tortor, ut dapibus nunc pretium in.
        Pellentesque pellentesque et tellus vel sollicitudin. Pellentesque
        fermentum mattis nunc a condimentum. Suspendisse potenti. Nulla
        vitae diam nec turpis pharetra fermentum sodales interdum dui.
      </Typography>

      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item xs={3}>
          <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
            Create Date
          </Typography>
          <Typography sx={{ marginTop: 2, fontSize: 14, fontWeight: 700 }}>
            Due Date
          </Typography>
          <Typography sx={{ marginTop: 2, fontSize: 14, fontWeight: 700 }}>
            Priority
          </Typography>
          <Typography sx={{ marginTop: 2, fontSize: 14, fontWeight: 700 }}>
            Time Estimate
          </Typography>
        </Grid>

        <Grid item xs={5}>
          <Typography sx={{ marginLeft: 3, fontSize: 14 }}>
            Fri, November 11, 2022
          </Typography>
          <div className='mt-4 mb-0 ml-6 text-sm' style={{ fontFamily: "Roboto, Helvetica, Arial,sans-serif"}}>
            <DatePicker 
              selected={startDate} 
              dateFormat='EEE, MMMM d, yyyy'
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className='mt-4 mb-0 ml-4 text-sm'>
            <Button style={{ textTransform: "none", height: 20, color: 'red' }}>
              High
              <KeyboardDoubleArrowUpIcon />
            </Button>
          </div>
          <TextField
            variant="standard"
            placeholder='None'
            size="small"
            sx={{ marginLeft: 3, marginTop: 2, width: "100%" }}
            InputProps={{ disableUnderline: true, style: { fontSize: 14 }}}
          ></TextField>
        </Grid>
      </Grid>

      <Typography sx={{ marginTop: 3, fontSize: 16, fontWeight: 700 }}>
        Activity
      </Typography>

      <Comments currentUserId="1" />
    </div>
  )
}

export default LeftIssueDetail