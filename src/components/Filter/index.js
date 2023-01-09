import {useEffect, useState, useRef} from 'react';
import {
  Paper,
  Typography,
  Button,
  Select,
  FormControl,
  MenuItem,
  Popper,
  Grow,
  MenuList,
  TextField,
  ClickAwayListener,
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
  return (
    <Box
      sx={{
        // width: 200,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="body1">
        {property[0].toUpperCase() + property.substring(1)}
      </Typography>
      <FormControl sx={{m: 1, width: 120, mx: 0, ml: 1}}>
        <select
          displayEmpty
          inputProps={{'aria-label': 'Without label'}}
          size="small"
          defaultValue={''}
          style={{
            border: '1px solid',
            width: '100%',
            height: 40,
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          <option value="">
            <em>None</em>
          </option>
          {values.map((value) => (
            <option value={value}>{value}</option>
          ))}
        </select>
      </FormControl>
    </Box>
  );
}

function Filter() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

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
  const prevOpen = useRef(open);
  useEffect(() => {
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
          <ClickAwayListener onClickAway={handleClose}>
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper
                elevation={3}
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
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  sx={{px: 2, py: 0}}
                >
                  {Object.entries(data).map(([key, value]) => (
                    <FilterRow property={key} values={value} />
                  ))}
                </MenuList>
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
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}

export default Filter;
