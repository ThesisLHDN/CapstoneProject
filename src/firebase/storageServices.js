import {ref, deleteObject} from 'firebase/storage';
import storage from 'src/firebase/config';

// Create a reference to the file to delete

// const deleteFile = () => {
//   const desertRef = ref(storage, 'images/desert.jpg');
//   // Delete the file
//   deleteObject(desertRef)
//     .then(() => {
//       // File deleted successfully
//     })
//     .catch((error) => {
//       // Uh-oh, an error occurred!
//     });
// };