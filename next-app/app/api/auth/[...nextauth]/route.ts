// [...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { NextResponse } from 'next/server';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post('http://34.101.174.135:8080/api/v1/auth/login', {
            email: credentials?.email,
            password: credentials?.password,
          });
      
          console.log('API Response:', response.data);
      
          if (response.data.status === 'success') {
            const { user, token } = response.data.data;
      
            console.log('User:', user);
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role_id,
              token,
            };
          } else {
            console.error('Invalid status in response:', response.data.status);
            return null;
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Login failed:', error.response?.data || error.message);
          } else {
            console.error('Login failed:', (error as Error).message);
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      // Attach token and user data to JWT
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Attach JWT token data to session
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        role: token.role,
      };
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
