'use server'
import {collection, addDoc, getDocs, deleteDoc, doc, query, onSnapshot} from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {db} from '../../components/firebase';
// import { useState } from 'react';

// Get a reference to the storage service, which is used to create references in your storage bucket
// Create the file metadata
// const uploadThePic = () => {
//   /** @type {any} */
//   const metadata = {
//     contentType: 'image/jpg'
//   };
// const storage = getStorage();

// // Create a storage reference from our storage service
// const canRef = ref(storage, 'images/can.jpg');

// // Use uploadBytesResumable instead of put
// const uploadTask = uploadBytesResumable(canRef, file, metadata);

// // You can then use the uploadTask to track the upload progress or get the download URL
// uploadTask.on('state_changed', 
//   (snapshot) => {
//     // Handle progress
//   }, 
//   (error) => {
//     // Handle error
//   }, 
//   () => {
//     // Handle successful upload
//     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//       console.log('File available at', downloadURL);
//     });
//   }
// );
// }

// This line is now incorporated into the function above
// const uploadTask = uploadBytesResumable(canRef, 'images/can.jpg', metadata);


export const addItem = async () => {
  await addDoc(collection(db, 'items'), {
    name: 'Item 1',
    price: 10,
  });
};

export const readItem = async () => {
  // const q = query(collection(db, "items"));
  const dataArray: { id: string; data: any }[] = [];
  const querySnapshot = await getDocs(collection(db, "items"));
  querySnapshot.forEach((doc) => {
    // console.log(doc.data().name);
    // console.log(`${doc.id} => ${doc.data()}`);
    dataArray.push({ id: doc.id, data: doc.data() });
  });
  // setItems(dataArray);
  // console.log(querySnapshot.forEach((doc) => console.log(doc.data())));
  // console.log(items);
  return dataArray;
};

export const deleteItem = async () => {
  // 'use server';
  await deleteDoc(doc(db, 'items', 'Item 1'));
};

