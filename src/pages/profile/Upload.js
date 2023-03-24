import React, {useState} from 'react';
import firebase from '../firebase';
const storage = firebase.storage();
const firestore = firebase.firestore();


function ImageUpload() {
  const [image, setImage] = useState(null); // state for storing image file
  const [url, setUrl] = useState(''); // state for storing image url

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImage(image);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        console.log('upload is ' + progress + '% done');
      },
      (error) => {
        // error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setUrl(url); // store url in state
            firestore
              .collection('notes')
              .add({
                imgURL: url, // write url to firestore
              })
              .then(() => {
                console.log('Image uploaded successfully');
              });
          });
      },
    );
  };

  return (
    <div>
      <progress value={progress} max="100" />
      <br />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      <img
        src={url || 'http://via.placeholder.com/400x300'}
        alt="Uploaded images"
        height="300"
        width="400"
      />
    </div>
  );
}

export default ImageUpload;
