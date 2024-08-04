import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { JWT } from 'next-auth/jwt';
import { initializeApp, getApps, getApp } from 'firebase/app';

//  signup();
export const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const authOptions = {
  pages: {
    signIn: '/login',
    signUp: '/signup',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials): Promise<any> {
        const { email, password, isSignUp } = credentials as {
          email: string;
          password: string;
          isSignUp?: boolean;
        };

        if (isSignUp) {
          try {
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );
            return {
              id: userCredential.user.uid,
              email: userCredential.user.email,
            };
          } catch (error) {
            console.error('Error signing up:', error);
            return null;
          }
        } else {
          try {
            const userCredential = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
            return {
              id: userCredential.user.uid,
              email: userCredential.user.email,
            };
          } catch (error) {
            console.error('Error signing in:', error);
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User | undefined }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
