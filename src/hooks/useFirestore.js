import {useEffect, useState} from 'react';
import {db} from 'src/firebase/config';
import {
  query,
  orderBy,
  where,
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
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setDocuments(data);
    });
    return unsubscribe;
  }, []);

  console.log('return documents', documents);
  return documents;
};

const useFirestoreDoc = (collectionPath, id) => {
  const [document, setDocument] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, collectionPath, id), (doc) => {
      setDocument({docId: doc.id, docData: doc.data()});
    });
    return unsubscribe;
  }, []);

  console.log('Returned doc', document);
  return document;
};

export {useFirestore, useFirestoreDoc};
