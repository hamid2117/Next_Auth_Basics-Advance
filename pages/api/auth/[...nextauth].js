import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { connectToDatabase } from '../../../helper/db'
import { ComparePassword } from '../../../helper/auth'
export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credientials) {
        const client = await connectToDatabase()
        const userCollections = client.db().collection('user')
        const userData = await userCollections.findOne({
          email: credientials.email,
        })
        if (!userData) {
          client.close()
          throw new Error('User doest not exist!!')
        }
        const isValid = await ComparePassword(
          credientials.password,
          userData.password
        )
        if (!isValid) {
          client.close()
          throw new Error('Password is incorrect')
        }
        client.close()
        return { email: userData.email }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === 'google') {
        console.log(profile.email)
        return true
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  },
})
