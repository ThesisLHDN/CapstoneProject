import {useEffect, useState} from 'react';
import {db} from 'src/firebase/config';
import {
  query,
  orderBy,
  where,
  doc,
  onSnapshot,
  collection,
} from 'firebase/firestore';

const useFirestore = (collectionName, condition = {}) => {
  const [documents, setDocuments] = useState([]);
  // console.log(
  //   'pre query for',
  //   collectionName,
  //   'with',
  //   condition.fieldName,
  //   condition.operator,
  //   condition.compareValue,
  //   condition.compareValue ? condition.compareValue.length : 'Gì dãy trời',
  //   'is',
  //   documents,
  // );
  useEffect(() => {
    const collectionRef = collection(db, collectionName);
    let q = query(collectionRef);
    if (condition) {
      // console.log(
      //   'in query for',
      //   collectionName,
      //   'with',
      //   condition.fieldName,
      //   condition.operator,
      //   condition.compareValue,
      //   condition.compareValue ? condition.compareValue.length : 'Gì dãy trời',
      //   'is',
      //   documents,
      // );
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
      condition.sort ? query(q, orderBy('createdAt', condition.sort)) : q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setDocuments(data);
      },
    );
    return unsubscribe;
  }, []);
  console.log(
    'useFireStore for',
    collectionName,
    'with',
    condition,
    'is',
    documents,
  );
  return documents;
};

const useFirestoreDoc = (collectionPath, id) => {
  const [document, setDocument] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, collectionPath, id), (doc) => {
      setDocument({id: doc.id, ...doc.data()});
    });
    return unsubscribe;
  }, []);

  console.log('Returned doc', document);
  return document;
};

export {useFirestore, useFirestoreDoc};
