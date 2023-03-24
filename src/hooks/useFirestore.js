import {useEffect, useState} from 'react';
import {db} from 'src/firebase/config';
import {
  query,
  orderBy,
  where,
  limit,
  doc,
  onSnapshot,
  getDoc,
  collection,
} from 'firebase/firestore';

const useFirestore = (collectionName, condition = {}) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, collectionName);
    // let q = query(collectionRef, orderBy('createAt'));
    let q = query(collectionRef);
    if (condition) {
      if (condition.compareValue && condition.compareValue.length) {
        q = query(
          collectionRef,
          where(
            condition.fieldName,
            condition.operator,
            condition.compareValue,
          ),
        );
      }
    }
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setDocuments(data);
      },
    );
    return unsubscribe;
  }, []);

  console.log('return documents', documents);
  return documents;
};

// export const useDoc = async (collectionName, id) => {
//   // const [documents, setDocuments] = useState([]);
//   console.log('useDocCall', collectionName, id);

//   const docRef = doc(db, collectionName, id);
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     console.log('Document data:', docSnap.data());
//   } else {
//     // doc.data() will be undefined in this case
//     console.log('No such document!');
//   }

//   return docSnap;
// };

export default useFirestore;
