import React, {useState, useMemo, useContext} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {useFirestore} from 'src/hooks/useFirestore';
import {auth} from 'src/firebase/config';
import CircularProgress from '@mui/material/CircularProgress';
import {AuthContext} from './AuthProvider';
export const AppContext = React.createContext();

export default function AppProvider({children}) {
  const {
    user: {uid},
  } = useContext(AuthContext);
  console.log('app provider', uid);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  // console.log('AppProvider', user);

  const RoomsCondition = useMemo(
    () => ({
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: uid,
    }),
    [uid],
  );

  const rooms = useFirestore('rooms', RoomsCondition);

  const selectedRoom = selectedRoomId
    ? rooms.find((room) => room.id === selectedRoomId)
    : rooms[0];

  // const messages = useFirestore('messages');
  // = useMemo(() => {
  //   if (selectedRoomId) {
  //     return rooms.find((room) => room.id === selectedRoomId);
  //   } else {
  //     return rooms[0];
  //   }
  // }, [rooms, selectedRoomId]));

  const membersCondition = useMemo(
    () => ({
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom ? selectedRoom.members : [],
    }),
    [selectedRoom ? selectedRoom.members : []],
  );

  console.log('membersCondition', membersCondition);

  const roomMembers = useFirestore('users', membersCondition);
  // const roomMemberssas = useFirestore('users');

  // const path = useMemo(
  //   () =>
  //     selectedRoom
  //       ? `rooms/${selectedRoom.id}/messages`
  //       : `rooms/trash/messages`,
  //   [selectedRoom],
  // );
  const messagesCondition = useMemo(() => {}, []);
  // const messages = useFirestore('rooms', messagesCondition);
  // const messages = useFirestore('rooms/ltuDQNnSDBxw6LX3iJpw/messages');

  // const messages = useFirestore(path);
  // if (messages && roomMembers) {
  //   var newMess = messages.map((message) => {
  //     return {
  //       author: roomMembers.find((member) => member.uid === message.authorId),
  //       ...message,
  //     };
  //   });
  // }

  return (
    <AppContext.Provider
      value={{
        rooms,
        roomMembers,
        selectedRoom,
        selectedRoomId,
        setSelectedRoomId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
  // value is the thing that all children can access
}
