import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

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
  ],
})
