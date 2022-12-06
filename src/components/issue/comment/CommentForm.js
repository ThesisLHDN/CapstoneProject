import { useState } from "react";
import { Avatar, Button } from "@mui/material";

const CommentForm = ({ isAvatar=true, initialText="", handleSubmit, handleCancel }) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };

  const onCancel = (event) => {
    setText("");
    handleCancel();
  }

  return (
    <form >
      <div className="flex">
        {isAvatar ? (
          <Avatar
            src="X"
            sx={{ width: 40, height: 40, backgroundColor: "#8993A4",  }}
            alt="Lam Nguyen"
          />
        ) : <></>}
        

        <textarea
          className={`w-full h-10 p-2 border-solid border-1 border-color text-sm ${isAvatar ? 'ml-2' : 'mt-2'}`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          rows={20}
        />
      </div>
      
      <div className={`${isAvatar ? 'ml-12' : ''} mt-2`}>
        <Button
          variant="contained"
          onClick={isTextareaDisabled ? null : onSubmit}
          sx={{
            textTransform: "none",
            height: 36,
            fontWeight: 700,
            backgroundColor: "green",
            '&:hover': { backgroundColor: "#42A100"}
          }}
        >
          Save
        </Button>
        <Button
          variant="text"
          onClick={onCancel}
          sx={{
            textTransform: "none",
            marginLeft: 1,
            height: 36,
            fontWeight: 700,
            color: "#42526E",
            padding: "8px 16px"
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;