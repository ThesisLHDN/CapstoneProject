import {useEffect} from 'react';
import {db} from 'src/firebase/config';

const useFirestore = (collectionName, condition) => {
  useEffect(() => {
    onSnapshot(collection(db, collectionName), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
    });
  }, []);
};
export default useFirestore;
