import NextAuth, { User } from "next-auth"
// import { authOptions } from "@/app/api/auth/[...nextauth]"
import CredentialsProvider from "next-auth/providers/credentials";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { JWT } from "next-auth/jwt";
import { initializeApp, getApps, getApp } from "firebase/app";
// import { auth } from "../firebase";
// import { JWT } from "next-auth/jwt";

// const signup = async () => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       // Redirect to login page after successful signup
//       router.push('/login');
//     } catch (error) {
//       console.error("Error signing up:", error);
//       // Handle error (e.g., show error message to user)
//     }
//   };

//  signup();
export const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

 const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
// console.log('firebaseConfig', getAuth(app))
 export const auth = getAuth(app);
//  const storage = getStorage(app);
//  const db = getFirestore(app);

 export const authOptions = {
  pages: {
    signIn: '/login',
    signUp: '/signup'
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
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return {
              id: userCredential.user.uid,
              email: userCredential.user.email,
            };
          } catch (error) {
            console.error("Error signing up:", error);
            return null;
          }
        } else {
          try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return {
              id: userCredential.user.uid,
              email: userCredential.user.email,
            };
          } catch (error) {
            console.error("Error signing in:", error);
            return null;
          }
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT, user: User | undefined }) {
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
// export const authOptions = {
//   // Configure one or more authentication providers
//   pages: {
//     signIn: '/login',
//     signUp: '/signup'
//   },
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {},
//       async authorize(credentials): Promise<any> {
//         return await signInWithEmailAndPassword(auth, (credentials as any).email || '', (credentials as any).password || '')
//           .then(userCredential => {
//             if (userCredential.user) {
//               return userCredential.user;
//             }
//             return null;
//           })
//           .catch(error => (console.log(error)))
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(error);
//   });
//       }
//     })
//   ],
//   secret: process.env.NEXTAUTH_SECRET,

  
// };


export default NextAuth(authOptions)