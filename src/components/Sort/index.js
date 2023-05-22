import React from 'react';
import {
  Paper,
  Typography,
  Button,
  MenuList,
  MenuItem,
  Popper,
  Grow,
} from '@mui/material';
import { ClickAwayListener } from '@mui/base';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import { color } from 'src/style';
import { useLocation } from 'react-router-dom';

const data = {
  status: 'Status',
  assignee: 'Assignee',
  type: 'Type',
  priority: 'Priority',
  none: 'None',
};

function Sort({setSrtVal, setSrt}) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const location = useLocation();
  const position = location.pathname.split('/')[1];

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    // if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //   return;
    // }
    setOpen(false);
  };

  const handleSubmit = (value) => {
    // if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //   return;
    // }
    setSrtVal(value);
    setSrt(true);
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
        startIcon={<SortRoundedIcon />}
      >
        Sort
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
                py: 1,
                px: 0,
                gap: 1,
              }}
            >
              <Typography sx={{fontWeight: 700, color: color.green03}}>
                Sort
              </Typography>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  sx={{py: 0}}
                >
                  {Object.entries(data).map(([key, value]) => {
                    if (
                      position !== 'board' ||
                      (position == 'board' && key !== 'status')
                    )
                      return (
                        <MenuItem
                          onClick={() => handleSubmit(value)}
                          sx={{
                            width: 150,
                            ...(key === 'none' && {
                              fontWeight: 700,
                              fontStyle: 'italic',
                              color: color.gray02,
                            }),
                          }}
                        >
                          {value}
                        </MenuItem>
                      );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

export default Sort;
