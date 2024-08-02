import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
export const signup = async (router: any, email: string, password: string) => {
  // console.log('key', process.env.API_KEY)
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    // Redirect to login page after successful signup
    router.push('/login');
  } catch (error) {
    console.error("Error signing up:", error);
    // Handle error (e.g., show error message to user)
  }
};
export const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};