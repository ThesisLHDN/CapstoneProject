import React, {useState, useMemo, useContext} from 'react';
import {useFirestore} from 'src/hooks/useFirestore';
import {AuthContext} from './AuthProvider';
import {AppContext} from './AppProvider';
export const ChatContext = React.createContext();

export default function ChatProvider({children}) {
  const {
    user: {uid},
  } = useContext(AuthContext);

  const {
    project: {id},
  } = useContext(AppContext);

  const [selectedRoomId, setSelectedRoomId] = useState('');
  // const [projectId, setProjectId] = useState();

  const RoomsCondition = useMemo(
    () => ({
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: uid,
    }),
    [uid],
  );

  const rawRooms = useFirestore('rooms', RoomsCondition);

  const rooms = rawRooms.filter((room) => room.projectId === id);

  const selectedRoom = selectedRoomId
    ? rooms.find((room) => room.id === selectedRoomId)
    : rooms[0];
  // const selectedRoom = rooms.find((room) => room.id === selectedRoomId);

  const membersCondition = useMemo(
    () => ({
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom ? selectedRoom.allmembers : [],
    }),
    [selectedRoom],
  );

  const roomMembers = useFirestore('users', membersCondition);
  const currentRoomMembers =
    roomMembers && selectedRoom
      ? roomMembers.filter((mem) => selectedRoom.members.includes(mem.id))
      : [];

  return (
    <ChatContext.Provider
      value={{
        uid,
        rooms,
        roomMembers,
        selectedRoom,
        selectedRoomId,
        setSelectedRoomId,
        currentRoomMembers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
  // value is the thing that all children can access
}
