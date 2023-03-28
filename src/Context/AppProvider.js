import React, {useState, useMemo, useContext} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {useFirestore} from 'src/hooks/useFirestore';
import {auth} from 'src/firebase/config';
import CircularProgress from '@mui/material/CircularProgress';
import {AuthContext} from './AuthProvider';
export const AppContext = React.createContext();

export default function AppProvider({children}) {
  const {user: uid} = useContext(AuthContext);
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

  const selectedRoom = useMemo(() => {
    if (selectedRoomId) {
      return rooms.find((room) => room.id === selectedRoomId);
    } else {
      return rooms[0];
    }
  }, [rooms, selectedRoomId]);

  const membersCondition = useMemo(
    () => ({
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom ? selectedRoom.members : [],
    }),
    [selectedRoom ? selectedRoom.members : []],
  );

  const roomMembers = useFirestore('users', membersCondition);

  // const messagesCondition = useMemo(() => {
  //   if (selectedRoomId) {
  //     return rooms.find((room) => room.id === selectedRoomId);
  //   } else {
  //     return rooms[0];
  //   }
  // }, [rooms, selectedRoomId]);

  // const messages = useFirestore(
  //   `rooms/${selectedRoomId ? selectedRoomId : 'a'}/messages`,
  // );

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
