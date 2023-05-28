import { useContext, useState } from 'react';
import { Box, Paper, Typography, Button, TextField, Dialog } from '@mui/material';
import { color } from 'src/style';
import { AppContext } from 'src/Context/AppProvider';
import { updateDocument } from 'src/firebase/firestoreServices';

function InviteMember({
  onSubmit,
  icon,
  sx,
  onClose,
  open,
  currentRoomMembers,
  roomMembers,
  selectedRoom,
}) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const {members} = useContext(AppContext);
  const membersEmail = members.map((mem) => mem.email);

  const addMemberHandler = async (email) => {
    console.log('email to add: ' + email);
    const currentRoomMemEmails = currentRoomMembers.map(
      (member) => member.email,
    );
    if (email) {
      if (membersEmail.includes(email)) {
        if (currentRoomMemEmails.includes(email)) {
          setError('Member is already in this room');
        } else {
          console.log('Add member', email);
          const memId = members.filter((member) => member.email === email)[0]
            .id;
          console.log(memId);
          if (!selectedRoom.members.includes(memId)) {
            selectedRoom.members.push(memId);
          }
          if (!selectedRoom.allmembers.includes(memId)) {
            selectedRoom.allmembers.push(memId);
          }
          updateDocument('rooms', selectedRoom.id, {
            members: selectedRoom.members,
            allmembers: selectedRoom.allmembers,
          });
          setError();
        }
      } else {
        setError('Member not found in project');
      }
    } else {
      setError('Please enter email');
    }
    // console.log(email);
    // const newMemberList = await getDocumentWithCondition('users', {
    //   fieldName: 'email',
    //   operator: '==',
    //   compareValue: email,
    // });

    // console.log(newMemberList);
    // const member = newMemberList.docs.map((member) => ({
    //   id: member.id,
    //   ...member.data(),
    // }))[0];
    // console.log(member);
    // if (member) {
    //   if (!(member.id in currentRoomMembers)) {
    //     selectedRoom.members.push(member.id);
    //     console.log('start update', member);
    //     updateDocument('rooms', selectedRoom.id, {
    //       members: selectedRoom.members,
    //       allmembers: selectedRoom.members,
    //     });
    //   }
    // }

    // onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmitHandler(input);
      setInput(false);
    }
  };

  const onSubmitHandler = (field) => {
    if (field) {
      console.log('submit', field);
      onSubmit(field);
      setError();
      setInput(false);
    } else {
      setError('Please input a valid value');
      setInput(false);
    }
  };

  const onCancelHandler = () => {
    setInput(false);
    setError();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onCancelHandler}>
      <Paper
        sx={{
          width: 300,
          p: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          paddingTop: '5px',
          ...sx,
        }}
      >
        <Box
          sx={{
            minHeight: 40,
            paddingTop: '5px',
            textAlign: 'center',
            borderBottom: 'solid black 1px',
          }}
        >
          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              alignItems: 'center',
              fontWeight: '700 !important',
              color: color.green03,
              '& *': {fontSize: 18},
            }}
          >
            {icon && ''}
            Invite member
          </Typography>
        </Box>

        <Typography sx={{fontSize: 14, textAlign: 'justify'}}>
          Please enter an email address
        </Typography>
        <TextField
          size="small"
          placeholder={'e.g. dangnguyen@gmail.com'}
          sx={{
            width: '100%',
            '& *': {fontSize: 14},
          }}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        ></TextField>
        {error && (
          <Typography
            variant="subtitle2"
            sx={{
              color: 'red',
              fontSize: '12px',
              textAlign: 'center',
              width: '100%',
            }}
          >
            {error}
          </Typography>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            '& button': {
              px: 2,
              fontSize: 14,
              fontWeight: 700,
              textTransform: 'none',
            },
          }}
        >
          {' '}
          <Button
            onClick={onCancelHandler}
            sx={{
              color: '#818181',
            }}
          >
            Cancel
          </Button>
          <Button
            size="small"
            sx={{
              backgroundColor: color.green03,
              color: 'white',
              '&:hover': {backgroundColor: '#1BB738'},
            }}
            onClick={() => addMemberHandler(input)}
          >
            Add member
          </Button>
        </Box>
      </Paper>
    </Dialog>
  );
}

export default InviteMember;
