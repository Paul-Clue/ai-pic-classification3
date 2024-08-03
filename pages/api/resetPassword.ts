import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
  // Your Firebase config here
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    await sendPasswordResetEmail(auth, email);
    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error sending password reset email', error: error.message });
    } else {
      res.status(500).json({ message: 'Error sending password reset email', error: 'An unknown error occurred' });
    }
  }
}