import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

// Define the NextAuth options
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post('http://34.101.174.135:8080/api/v1/auth/login', {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (response.data.status === 'success') {
            const { user, token } = response.data.data;
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role_id,
              token,
            };
          }
          return null;
        } catch (error) {
          console.error('Login failed:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
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
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        role: token.role,
      };
      session.accessToken = token.accessToken;
      return session;
    },
    async redirect({ url }) {
      const baseUrl = 'https://3002-cs-239652182010-default.cs-asia-southeast1-ajrg.cloudshell.dev';
      if (url.startsWith('/api/auth/signout')) {
         return baseUrl;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};

// Create and export the route handler for GET and POST
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
