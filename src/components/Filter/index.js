import {useEffect, useState, useRef, useContext} from 'react';
import {
  Paper,
  Typography,
  Button,
  FormControl,
  Popper,
  Grow,
  MenuList,
  ClickAwayListener,
} from '@mui/material';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import {Box} from '@mui/system';
import {color, colorHover} from 'src/style';
import {useLocation} from 'react-router-dom';
import {AppContext} from 'src/Context/AppProvider';
import axios from 'src/hooks/axios';

const data = {
  status: ['To do', 'In progress', 'Testing', 'Done'],
  type: ['Task', 'Bug', 'Story'],
  priority: ['High', 'Medium', 'Low'],
  tags: [],
};

function FilterRow({property, values, state, setState}) {
  const handleChange = (e) => {
    setState({...state, [property]: e.target.value});
  };

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
      <FormControl sx={{m: 1, width: 120, mx: 0, ml: 1}} margin="none">
        <select
          displayEmpty
          inputProps={{'aria-label': 'Without label'}}
          size="small"
          defaultValue={''}
          value={state[property]}
          onChange={handleChange}
          style={{
            border: '1px solid #EFEDF0',
            outline: 'none',
            width: '100%',
            height: 30,
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

function Filter({vals, setVals, setFil}) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const location = useLocation();
  const position = location.pathname.split('/')[1];
  const {project} = useContext(AppContext);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClear = () => {
    setVals({
      status: '',
      type: '',
      priority: '',
      tags: '',
    });
  };

  const handleSubmit = () => {
    setOpen((prevOpen) => !prevOpen);
    setFil(true);
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

  const getTags = async () => {
    try {
      const res = await axios.get(`/ptags/${project.id}`);
      data['tags'] = res.data.map((tag) => tag.tagname);
    } catch (err) {
      console.log(err);
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    getTags();
  }, []);

  console.log(vals);

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
                  pt: 1.5,
                  pb: 2,
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
                  {Object.entries(data).map(([key, value]) => {
                    if (
                      position != 'board' ||
                      (position == 'board' && key != 'status')
                    )
                      return (
                        <FilterRow
                          property={key}
                          values={value}
                          state={vals}
                          setState={setVals}
                        />
                      );
                  })}
                </MenuList>
                <div className="flex">
                  <Button
                    sx={{mr: 1, width: 80, ...colorHover.greenGradBtn}}
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{width: 80, textTransform: 'none'}}
                    onClick={handleClear}
                  >
                    Clear
                  </Button>
                </div>
              </Paper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}

export default Filter;
