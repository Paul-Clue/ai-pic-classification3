import NextAuth, { User } from "next-auth"
// import { authOptions } from "@/app/api/auth/[...nextauth]"
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "@/app/firebase";
// import { JWT } from "next-auth/jwt";

export const authOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: '/signin'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials): Promise<any> {
        return await signInWithEmailAndPassword(auth, (credentials as any).email || '', (credentials as any).password || '')
          .then(userCredential => {
            if (userCredential.user) {
              return userCredential.user;
            }
            return null;
          })
          .catch(error => (console.log(error)))
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
  });
      }
    })
  ],


  // providers: [
  //   CredentialsProvider({
  //     name: 'Credentials',
  //     credentials: {},
  //     async authorize(credentials): Promise<any> {
  //       try {
  //         const userCredential = await signInWithEmailAndPassword(
  //           auth,
  //           (credentials as any).email || '',
  //           (credentials as any).password || ''
  //         );
  //         if (userCredential.user) {
  //           return {
  //             id: userCredential.user.uid,
  //             email: userCredential.user.email,
  //           };
  //         }
  //         return null;
  //       } catch (error) {
  //         console.error(error);
  //         return null;
  //       }
  //     }
  //   })
  // ],
  // callbacks: {
  //   async jwt({ token, user }: { token: JWT, user: User | undefined }) {
  //     if (user) {
  //       token.id = user.id;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }: { session: any, token: JWT }) {
  //     if (token) {
  //       session.user.id = token.id;
  //     }
  //     return session;
  //   },
  // },
  // // pages: {
  // //   signIn: '/login',
  // // },
  // session: {
  //   strategy: "jwt" as const,
  // },
};
export default NextAuth(authOptions)