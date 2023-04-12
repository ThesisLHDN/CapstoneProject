import React, {useState, useMemo, useContext} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {useFirestore} from 'src/hooks/useFirestore';
import {auth} from 'src/firebase/config';
import CircularProgress from '@mui/material/CircularProgress';
import {AuthContext} from './AuthProvider';
export const ChatContext = React.createContext();

export default function ChatProvider({children}) {
  const {
    user: {uid},
  } = useContext(AuthContext);
  // console.log('Chat provider', uid);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [projectId, setProjectId] = useState();
  // console.log('ChatProvider', user);

  const RoomsCondition = useMemo(
    () => ({
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: uid,
    }),
    [uid],
  );

  const rawRooms = useFirestore('rooms', RoomsCondition);

  const rooms = rawRooms.filter((room) => room.projectId === projectId);

  const selectedRoom = selectedRoomId
    ? rooms.find((room) => room.id === selectedRoomId)
    : rooms[0];

  const membersCondition = useMemo(
    () => ({
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom ? selectedRoom.allmembers : [],
    }),
    [selectedRoom],
  );

  // console.log('membersCondition', membersCondition);

  const roomMembers = useFirestore('users', membersCondition);
  const currentRoomMembers =
    roomMembers && selectedRoom
      ? roomMembers.filter((mem) => selectedRoom.members.includes(mem.id))
      : [];

  return (
    <ChatContext.Provider
      value={{
        rooms,
        roomMembers,
        selectedRoom,
        selectedRoomId,
        setSelectedRoomId,
        currentRoomMembers,
        projectId,
        setProjectId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
  // value is the thing that all children can access
}
