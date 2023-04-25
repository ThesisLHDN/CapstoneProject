import React, {useEffect, useState} from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactQuill, {Quill, editor} from 'react-quill';
// import ImageResize  from 'quill-image-resize-module';
import 'react-quill/dist/quill.snow.css';
// import katex from "katex";
// import "katex/dist/katex.min.css";
import CustomToolbar from './CustomToolbar';
import {Box, Button, Paper, TextField, Dialog, Typography} from '@mui/material';
import './quill.css';
// window.katex = katex;
import {color} from 'src/style';

// Quill.register('modules/ImageResize',ImageResize);
const Editor = ({file, onClose, open}) => {
  const [text, setText] = useState(file ? file.body : '');
  const [name, setName] = useState(file ? file.name : 'Untitled');
  const [error, setError] = useState('');
  // console.log(file);

  React.useEffect(() => {
    if (file) {
      setText(file.body ? file.body : '');
      setName(file.name ? file.name : 'Untitled');
    } else {
      setText('');
      setName('');
    }
  }, [file]);

  const handleChange = (html) => {
    setText(html);
  };

  const modules = {
    toolbar: {
      container: '#toolbar',
    },
  };

  const formats = [
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'script',
    'header',
    'blockquote',
    'code-block',
    'indent',
    'list',
    'direction',
    'align',
    'link',
    'image',
    'video',
    'formula',
  ];

  const onSaveHandler = () => {
    if (name) {
      onClose({
        ...file,
        name: name,
        body: text,
        type: 'editableHTML',
      });
      setText('');
      setName('');
      setError(false);
    } else setError('File name cannot be empty');
  };
  return (
    <Dialog onClose={() => onClose(false)} open={open}>
      {file.name && (
        <Paper sx={{p: 2, gap: 2, display: 'flex', flexDirection: 'column'}}>
          <TextField
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>

          <Box
            sx={{
              border: 'solid rgba(0,0,0,0.23) 1px',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <CustomToolbar />
            <ReactQuill
              value={text}
              onChange={handleChange}
              modules={modules}
              formats={formats}
            />
          </Box>
          {error && (
            <Typography color="error" variant="subtitle2">
              {error}
            </Typography>
          )}
          <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 2}}>
            {' '}
            <Button
              sx={{
                color: '#818181',
              }}
              onClick={() => {
                setText('');
                setName('');
                onClose(false);
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{
                backgroundColor: color.green03,
                color: 'white',
                '&:hover': {backgroundColor: '#1BB738'},
              }}
              onClick={onSaveHandler}
            >
              Save
            </Button>
          </Box>
        </Paper>
      )}
    </Dialog>
  );
};

export default Editor;
