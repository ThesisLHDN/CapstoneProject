import React, {useEffect, useState} from 'react';
import {TextField} from '@mui/material';
import './taginput.scss';
import axios from 'axios';

function TagsInput(props) {
  const [tags, setTags] = useState([]);

  const removeTags = (indexToRemove, tagname) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    deleteTag(tagname);
  };

  const addTags = (event) => {
    if (event.target.value !== '') {
      setTags([...tags, event.target.value]);
      createTag(event.target.value);
      event.target.value = '';
    }
  };

  const createTag = async (tagname) => {
    try {
      await axios.post('http://localhost:8800/tag', {
        tagname: tagname,
        issueId: props.issueId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTag = async (tagname) => {
    try {
      await axios.delete(
        `http://localhost:8800/tag/${props.issueId}?name=${tagname}`,
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTags(props.tags);
  }, [props.tags]);

  // console.log('###########', props.tags);

  return (
    <div className="flex items-start flex-wrap w-full">
      <ul className="flex flex-wrap">
        {tags.map((tag, index) => (
          <li
            key={index}
            className="tag flex h-8 items-center justify-center mr-1.5 text-sm rounded-lg bg-tg-color text-tg-text-color pl-2.5 pr-1.5"
          >
            <span>{tag}</span>
            <div
              className="tag-close-icon"
              onClick={() => removeTags(index, tag)}
            >
              x
            </div>
          </li>
        ))}
      </ul>
      <TextField
        variant="standard"
        placeholder="Add tags"
        size="small"
        sx={{width: 60, height: '24px', fontSize: 14, padding: '6px 0 0 0'}}
        InputProps={{disableUnderline: true, style: {fontSize: 14}}}
        onKeyUp={(event) => (event.key === 'Enter' ? addTags(event) : null)}
      ></TextField>
    </div>
  );
}

export default TagsInput;
