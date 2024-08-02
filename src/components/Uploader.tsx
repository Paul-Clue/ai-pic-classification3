import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, StorageReference, UploadTask, getStorage } from 'firebase/storage';
import { storage } from '../app/firebase'; 
// import { storage } from './firebase'; // Ensure this imports the correct initialized storage
import Image from 'next/image';


// Define the type for the image state
type ImageFile = File | null;
// console.log('storage', storage);

function ImageUpload() {
  // Define state variables with appropriate types
  const [image, setImage] = useState<ImageFile>(null);
  const [progress, setProgress] = useState<number>(0);
  const [downloadURL, setDownloadURL] = useState<string>('');

  // const storage = getStorage();

  // Event handler for file input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Function to handle the upload process
  const handleUpload = (): void => {
    console.log("This ran");
    if (!image) return;

    // Create a storage reference from our storage service
    const storageRef: StorageReference = ref(storage, `images/${image.name}`);
    const uploadTask: UploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        setProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error('Upload failed:', error);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
          console.log('File available at', downloadURL);
          setDownloadURL(downloadURL);
        });
      }
    );
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      <button onClick={handleUpload}>Upload Image</button>
      <p>Progress: {progress}%</p>
      {downloadURL && <Image src={downloadURL} alt="Uploaded file" width={100} height={100} />}
      {/* {downloadURL && <Image src={downloadURL} alt="Uploaded file" />} */}
    </div>
  );
}

export default ImageUpload;