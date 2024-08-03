// import {collection, addDoc, getDocs, deleteDoc, doc, query, onSnapshot} from 'firebase/firestore';
// import {db} from '../firebase';
'use client';
import { useEffect, useState, useRef } from 'react';
// import { readItem } from '../helpers/crudHelper';
// import { deleteItem } from '../helpers/crudHelper';
// import { addItem } from '../helpers/crudHelper';
// import Uploader from '../../components/Uploader';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
// import { useRouter } from 'next/navigation';
// import Router from 'next/router';
import { Camera } from 'react-camera-pro';
import Image from 'next/image';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
// import { auth } from '../../../pages/api/firebase';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
// import { ai } from '../../../pages/api/openai';
// import * as dotenv from 'dotenv';
// dotenv.config();
// import { OpenAI } from 'openai';
// const openai = new OpenAI();

// import { withRouter } from 'next/router';

function UploadPage() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });

  const camera = useRef<typeof Camera>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [imageDescription, setImageDescription] = useState<string | null>(null);
  const [faceMode, setFaceMode] = useState<'user' | 'environment'>(
    'environment'
  );

  const toggleFacingMode = () => {
    if (camera.current && 'switchCamera' in camera.current) {
      (camera.current as any).switchCamera();
      setFaceMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
    }
  };

  const takePhoto = () => {
    if (camera.current && 'takePhoto' in camera.current) {
      const photo = (camera.current as any).takePhoto();
      // Convert the photo to base64
      fetch(photo)
        .then((res) => res.blob())
        .then((blob) => {
          console.log('blob', blob);
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64Image = reader.result as string;
            setImage(base64Image);
            sendImageToOpenAI(base64Image);
          };
          reader.readAsDataURL(blob);
        });
    }
  };

  const sendImageToOpenAI = async (base64Image: string) => {
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      });

      if (!response.ok) {
        throw new Error('Failed to get image description');
      }

      const data = await response.json();
      setImageDescription(data.description);
    } catch (error) {
      console.error('Error getting image description:', error);
      setImageDescription('Failed to get image description');
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container
        component='main'
        maxWidth='md'
        sx={{
          maxHeight: '100vh', // 90% of the viewport height
          // overflow: 'auto', // Add scrollbars if content exceeds maxHeight
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '24px',
          // overflowY: 'auto',
          // border: '1px solid red',
        }}
      >
        <CssBaseline />
        {/* <main className='flex min-h-screen flex-col items-center justify-between p-24'> */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '24px',
            // border: '1px solid red',
          }}
        >
          {/* <h1>UploadPage</h1> */}
          {/* <form>
          <input type='file' />
          <button type='submit'>Upload</button>
        </form> */}
          {/* <Uploader /> */}
          <Box
            sx={{
              maxWidth: '500px',
              // aspectRatio: '4/5',
              marginBottom: '20px',
              border: '1px solid whitesmoke',
            }}
          >
            {isCameraOn ? (
              <Box
                style={{
                  display: 'flex',
                  width: '300px',
                  // border: '1px solid red',
                  flexDirection: 'column',
                  alignItems: 'center',
                  // marginLeft: '-100px',
                }}
              >
                <Button
                  variant='outlined'
                  sx={{
                    color: 'green',
                    borderColor: 'green',
                    marginBottom: '10px',
                    marginTop: '10px',
                  }}
                  onClick={toggleFacingMode}
                >
                  <CameraswitchIcon sx={{ color: 'green' }} />
                </Button>
                <Camera
                  ref={camera}
                  // facingMode={facingMode}
                  // facingMode={'environment'}
                  aspectRatio={16 / 16}
                  errorMessages={{
                    noCameraAccessible: 'No camera device accessible',
                    permissionDenied: 'Permission denied',
                    switchCamera: 'Could not switch camera',
                    canvas: 'Canvas error',
                  }}
                />
                <Box
                  style={{
                    width: '100%',
                    height: '250px',
                    // border: '1px solid red',
                    marginTop: '2px',
                    padding: '20px',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {/* <Image
                    src={image || ''}
                    width={150}
                    height={150}
                    alt='Taken photo'
                  /> */}
                  {image && (
                    <Box>
                      <Image
                        src={image}
                        width={200}
                        height={150}
                        style={{ margin: 'auto' }}
                        alt='Taken photo'
                      />
                      {/* <Box> */}
                        {imageDescription && (
                          <Typography variant='body1' sx={{ mt: 2 }}>
                            Description: {imageDescription}
                          </Typography>
                        )}
                      {/* </Box> */}
                    </Box>
                  )}
                </Box>
                {/* <Button
                  variant='contained'
                  onClick={() => setIsCameraOn(!isCameraOn)}
                  style={{ marginTop: '10px' }}
                >
                  {isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
                </Button> */}
              </Box>
            ) : (
              <>
                <Box className='camera-placeholder'>Camera is off</Box>
                {/* <Button
                  variant='contained'
                  onClick={() => setIsCameraOn(!isCameraOn)}
                  style={{ marginTop: '10px' }}
                >
                  {isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
                </Button> */}
              </>
            )}
          </Box>
          <Button
            variant='contained'
            onClick={() => setIsCameraOn(!isCameraOn)}
            style={{ marginBottom: '10px' }}
          >
            {isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
          </Button>
          {isCameraOn && (
            <Box>
              {/* <Button
                variant='outlined'
                sx={{ color: 'green', borderColor: 'green' }}
                onClick={toggleFacingMode}
              >
                <CameraswitchIcon sx={{ color: 'green' }} />
              </Button> */}
              <Button
                variant='contained'
                // onClick={() => {
                //   if (camera.current && 'takePhoto' in camera.current) {
                //     const photo = (camera.current as any).takePhoto();
                //     setImage(photo);
                //   }
                // }}
                onClick={takePhoto}
              >
                Take photo
              </Button>
            </Box>
          )}
          {/* <Box style={{ width: '100px', height: '100px' }}>
            <Image
              src={image || ''}
              width={100}
              height={100}
              alt='Taken photo'
            />
          </Box> */}

          {/* <div>
          <ul>
            {items.map((item) => (
              <li key={item.id}>{item.data.name}</li>
            ))}
          </ul>
        </div> */}
        </Box>
        {/* </main> */}
      </Container>
    </ThemeProvider>
  );
}

UploadPage.requireAuth = true;

export default UploadPage;
