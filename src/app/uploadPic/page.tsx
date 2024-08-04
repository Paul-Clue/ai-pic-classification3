'use client';

import { useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Camera } from 'react-camera-pro';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';

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
        className='h-full w-full flex flex-col items-center
         justify-center p-24'
      >
        <Box className='h-lvh w-full flex flex-col items-center justify-center p-24'>
          <Box
            sx={{
              marginBottom: '20px',
              border: '1px solid green',
              borderRadius: '15px',
              boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
              backgroundColor: 'black',
            }}
          >
            {isCameraOn ? (
              <Box
                style={{
                  display: 'flex',
                  width: '300px',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Button
                  variant='contained'
                  sx={{
                    color: 'green',
                    backgroundColor: 'green',
                    marginBottom: '10px',
                    marginTop: '10px',
                  }}
                  onClick={toggleFacingMode}
                >
                  <CameraswitchIcon sx={{ color: 'whitesmoke' }} />
                </Button>
                <Camera
                  ref={camera}
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

                    marginTop: '2px',
                    padding: '20px',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {image && (
                    <Box>
                      <Image
                        src={image}
                        width={200}
                        height={150}
                        style={{ margin: 'auto' }}
                        alt='Taken photo'
                      />

                      {imageDescription && (
                        <Typography variant='body1' sx={{ mt: 2 }}>
                          Description: {imageDescription}
                        </Typography>
                      )}
                    </Box>
                  )}
                </Box>
              </Box>
            ) : (
              <>
                <Box
                  className='camera-placeholder'
                  style={{
                    color: 'whitesmoke',
                    width: '150px',
                    textAlign: 'center',
                  }}
                >
                  Camera is off
                </Box>
              </>
            )}
          </Box>
          <Button
            variant='contained'
            onClick={() => setIsCameraOn(!isCameraOn)}
            style={{ marginBottom: '10px', width: '200px' }}
          >
            {isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
          </Button>
          {isCameraOn && (
            <Box>
              <Button
                variant='contained'
                style={{ width: '200px' }}
                onClick={takePhoto}
              >
                Take photo
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

UploadPage.requireAuth = true;

export default UploadPage;
