import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        Credentials({
            credentials: {username: {}, password: {}},
            authorize: async (credentials, req) => {
                return {
                    username: credentials.username,
                    password: credentials.password,
                }
            }
        })
    ],

    secret: process.env.NEXTAUTH_SECRET,
    
    session: {
        strategy: 'jwt'
    },

    callbacks: {
        jwt: async ({token, user}) => {
            if (user) {
                token.user = user;
            }
            return token;
        },
        session: async ({session, token}) => {
            if (token) {
                session.user = token;
            }
            return session;
        },
    }
}

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST }