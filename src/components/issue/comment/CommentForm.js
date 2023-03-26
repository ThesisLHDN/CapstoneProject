import {useState} from 'react';
import {Avatar, Button} from '@mui/material';

const CommentForm = ({
  currentUser,
  isAvatar = true,
  initialText = '',
  handleSubmit,
  handleCancel,
}) => {
  const [text, setText] = useState(initialText);
  const [displayBtns, setDisplayBtns] = useState(true);
  const isTextareaDisabled = text.length === 0;

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText('');
  };

  const onCancel = (event) => {
    setText('');
    setDisplayBtns(false);
    // handleCancel();
  };

  return (
    <form>
      <div className="flex">
        {isAvatar ? (
          <Avatar
            src={currentUser.photoURL}
            sx={{width: 40, height: 40, backgroundColor: '#8993A4'}}
            alt={currentUser.displayName}
          />
        ) : (
          <></>
        )}
        <textarea
          className={`w-full h-10 p-2 border-solid border-1 border-color text-sm ${
            isAvatar ? 'ml-2' : 'mt-2'
          }`}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setDisplayBtns(true);
          }}
          placeholder="Add a comment..."
          rows={20}
        />
      </div>

      {displayBtns && (
        <div className={`${isAvatar ? 'ml-12' : ''} mt-2`}>
          <Button
            variant="contained"
            onClick={isTextareaDisabled ? null : onSubmit}
            sx={{
              textTransform: 'none',
              height: 36,
              fontWeight: 700,
              backgroundColor: 'green',
              '&:hover': {backgroundColor: '#42A100'},
            }}
          >
            Save
          </Button>

          <Button
            variant="text"
            onClick={onCancel}
            sx={{
              textTransform: 'none',
              marginLeft: 1,
              height: 36,
              fontWeight: 700,
              color: '#42526E',
              padding: '8px 16px',
            }}
          >
            Cancel
          </Button>
        </div>
      )}
    </form>
  );
};

export default CommentForm;
