import React, { useState } from 'react'
import { TextField } from '@mui/material';
import './taginput.scss'

function TagsInput(props) {
  const [tags, setTags] = useState(props.tags)

  const removeTags = indexToRemove => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
	};

  const addTags = event => {
		if (event.target.value !== "") {
			setTags([...tags, event.target.value]);
			event.target.value = "";
		}
	};

  return (
		<div className="flex items-start flex-wrap w-full">
			<ul className='flex flex-wrap'>
				{tags.map((tag, index) => (
					<li 
            key={index} 
            className="tag flex h-8 items-center justify-center mr-1.5 text-sm rounded-lg bg-tg-color text-tg-text-color pl-2.5 pr-1.5"
          >
						<span>{tag}</span>
						<div className="tag-close-icon" onClick={() => removeTags(index)}>x</div>
					</li>
				))}
			</ul>
      <TextField
        variant="standard"
        placeholder='Add tags'
        size="small"
        sx={{ width: 60, height: "24px", fontSize: 14, padding: "6px 0 0 0" }}
        InputProps={{ disableUnderline: true, style: { fontSize: 14 }}}
        onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
      ></TextField>
		</div>
	);
}

export default TagsInput