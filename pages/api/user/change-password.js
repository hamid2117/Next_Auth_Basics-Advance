import { getSession } from 'next-auth/react'
import { connectToDatabase } from '../../../helper/db'
import { ComparePassword, hashPassword } from '../../../helper/auth'
const helper = async (req, res) => {
  if (req.method !== 'PATCH') {
    return
  }

  const session = await getSession({ req }) // to check the cookies is valid or not
  if (!session) {
    res.status(402).json({ message: 'user is not authorized . ' })
    return
  }
  const { newPassword, oldPassword } = req.body

  const client = await connectToDatabase()
  let db = client.db().collection('user')

  const userData = await db.findOne({ email: session?.user?.email })
  const isValid = await ComparePassword(oldPassword, userData.password)
  if (!isValid) {
    client.close()
    res.status(403).json({ message: 'Old password is wronge . ' })
    return
  }

  const hashedPassword = await hashPassword(newPassword)

  const result = await db.updateOne(
    { email: userData.email },
    { $set: { password: hashedPassword } }
  )
  client.close()
  res.status(200).json({ message: 'password is updated' })
}

export default helper
