import React from 'react'
import { Typography, Box, Button, Grid, Breadcrumbs, Link, IconButton } from '@mui/material'
import SearchBar from 'src/components/search'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
// import SortRoundedIcon from "@mui/icons-material/SortRounded"
import AddIcon from '@mui/icons-material/Add'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import Sort from 'src/components/Sort'

const folders = [
  {
    name: "Folder 1",
    createBy: "Lam Nguyen",
    updateOn: "05/12/2022",
    parent: "",
    children: []
  },
  {
    name: "Folder 2",
    createBy: "Lam Nguyen",
    updateOn: "05/12/2022",
    parent: "",
    children: []
  }
]

const files = [
  {
    name: "File 3",
    createBy: "Lam Nguyen",
    updateOn: "05/12/2022",
    parent: "Folder 2",
  },
  {
    name: "File 4",
    createBy: "Lam Nguyen",
    updateOn: "05/12/2022",
    parent: "",
  }
]

function convertDate(d) {
  const date = new Date(d)
  return date.toLocaleString('en-us', { month: 'short' }) + " " + date.getDate() + ", " + date.getFullYear()
}

function Document() {
  const rootDocument = folders.concat(files).filter((item) => item.parent === "")

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ mb: 2 }}>
            <Link
              underline="hover"
              key="1"
              color="inherit"
              href="/"
              onClick={() => {}}
            >
              Dang's Workspace
            </Link>
            <Link
              underline="hover"
              key="2"
              color="inherit"
              href="/backlog"
              onClick={() => {}}
            >
              First Scrum Project
            </Link>
            <Typography key="3" color="text.primary">
              Documents
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ color: "green", fontWeight: 700 }}>
        Documents
      </Typography>

      <Box sx={{ display: "flex", gap: 1, gridTemplateColumns: "repeat(4, 1fr)", mt: 2 }}>
        <SearchBar sx={{width:"210px"}}/>
        {/* <Button
          variant="text"
          startIcon={<SortRoundedIcon />}
          sx={{ color: "#181818", textTransform: "none" }}
        >
          Sort
        </Button> */}
        <Sort/>
        <Button
          variant="text"
          startIcon={<VisibilityOutlinedIcon />}
          sx={{ color: "#181818", textTransform: "none" }}
        >
          View
        </Button>
      </Box>

      <Button
        variant="text"
        startIcon={<AddIcon />}
        sx={{ color: "black", fontSize: "14px", textTransform: "none", mt: 2 }}
      >
        Add new item
      </Button>

      {rootDocument.map((item) => {
        return (
          <Grid container sx={{ marginTop: 1, marginBottom: 1 }}>
            <Grid item xs={3}>
              <Grid container>
                {item.hasOwnProperty('children') ? (
                  <div>
                    <KeyboardArrowRightOutlinedIcon sx={{ marginTop: 1.5, marginRight: 0.5 }}/>
                    <FolderOutlinedIcon sx={{ width: 32, height: 32, marginTop: 0.9 }}/>
                  </div>
                ) : (
                  <DescriptionOutlinedIcon sx={{ width: 32, height: 32, marginTop: 0.9, marginLeft: 3.5 }} />
                )}
                <Typography 
                  sx={{ 
                    marginTop: 1.5, 
                    marginLeft: 1, 
                    fontSize: 14,
                    cursor: "pointer", 
                    '&:hover': { textDecoration: "underline" } 
                  }}
                  onClick={() => {}}
                >{item.name}</Typography>
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <Typography sx={{ marginTop: 1.5, fontSize: 14 }}>
                <span className='font-bold'>Create by </span> 
                {item.createBy}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography sx={{ marginTop: 1.5, fontSize: 14 }}>
                <span className='font-bold'>Update on </span> 
                {convertDate(item.updateOn)}
              </Typography>
            </Grid>

            <Grid item xs={1}>
              <Grid container>
                <IconButton size="medium">
                  <ShareOutlinedIcon sx={{ color: '#181818' }} />
                </IconButton>
                <IconButton size="medium">
                  <MoreHorizOutlinedIcon sx={{ color: '#181818' }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        )
      })}

         
    </div>
  )
}

export default Document