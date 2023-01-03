import React from 'react';
import {
  Paper,
  Checkbox,
  Typography,
  Button,
  Select,
  FormControl,
  MenuItem,
  Popper,
  Grow,
  ClickAwayListener,
  FormHelperText,
  MenuList,
} from '@mui/material';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';

import {Box} from '@mui/system';
import {color, colorHover} from 'src/style';

const data = {
  status: ['To do', 'In progress', 'Done'],
  assignee: ['Lam Hoang', 'Dang Nguyen'],
  type: ['Task', 'Bug', 'Story'],
  epic: ['UI/UX', 'Business', 'Research'],
  priority: ['Critical', 'High', 'Medium', 'Low'],
};

function FilterRow({property, values}) {
  //   const property = props.property;
  //   const values = props.value;
  console.log(property);
  //   console.log(value);
  //   console.log(props)
  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="body1">
        {property[0].toUpperCase() + property.substring(1)}
      </Typography>
      <FormControl sx={{m: 1, minWidth: 120}}>
        <Select
          //   value={age}
          //   onChange={handleChange}
          displayEmpty
          inputProps={{'aria-label': 'Without label'}}
          size="small"
          defaultValue={''}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {values.map((value) => (
            <MenuItem value={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

function Filter() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        sx={{textTransform: 'none', color: '#181818'}}
        startIcon={<FilterAltRoundedIcon />}
      >
        Filter
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{zIndex: 5}}
      >
        {({TransitionProps, placement}) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 2,
                gap: 1,
              }}
            >
              <Typography sx={{fontWeight: 700, color: color.green03}}>
                Filter
              </Typography>
              {/* <ClickAwayListener onClickAway={handleClose}> */}
              <MenuList
                autoFocusItem={open}
                id="composition-menu"
                aria-labelledby="composition-button"
                onKeyDown={handleListKeyDown}
              >
                {Object.entries(data).map(([key, value]) => (
                  <MenuItem>
                    <FilterRow property={key} values={value} />
                  </MenuItem>
                ))}
              </MenuList>
              {/* </ClickAwayListener> */}
              <Button
                sx={{...colorHover.greenGradBtn}}
                variant="contained"
                onClick={handleToggle}
              >
                Confirm
              </Button>
              <Button variant="outlined" color="error">
                Clear filter
              </Button>
            </Paper>
          </Grow>
        )}
      </Popper>
      {/* <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({TransitionProps, placement}) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <Typography sx={{fontWeight: 700, color: color.green03}}>
                  Filter
                </Typography>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {Object.entries(data).map(([key, value]) => (
                    <FilterRow property={key} values={value} />
                  ))}
                </MenuList>

                <Button sx={{...colorHover.greenGradBtn}} variant="contained">
                  Confirm
                </Button>
                <Button variant="outlined" color="error">
                  Clear filter
                </Button>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper> */}

      {/* <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 2,
          gap: 1,
        }}
      >
        <Typography sx={{fontWeight: 700, color: color.green03}}>
          Filter
        </Typography>
        {Object.entries(data).map(([key, value]) => (
          <FilterRow property={key} values={value} onClick={handleClose} />
        ))}
        <Button sx={{...colorHover.greenGradBtn}} variant="contained">
          Confirm
        </Button>
        <Button variant="outlined" color="error">
          Clear filter
        </Button>
      </Paper> */}
    </>
  );
}

export default Filter;
