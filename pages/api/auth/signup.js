import { connectToDatabase } from '../../../helper/db'
import { hashPassword } from '../../../helper/auth'

const handler = async (req, res) => {
  let db, client
  try {
    client = await connectToDatabase()
    db = client.db()
  } catch (error) {
    res.status(403).json({ message: "can't able to connect with database" })
    return
  }

  if (req.method == 'POST') {
    const { email, password } = req.body
    const hashedPassword = await hashPassword(password)

    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7
    ) {
      client.close()
      res.status(430).json({ message: 'Please send valid email and password ' })
      return
    }

    const alreadyExist = db.collection('user').findOne({ email })

    if (alreadyExist) {
      res.status(440).json({ message: 'This account is already exists' })
      client.close()
      return
    }

    const userData = {
      email,
      password: hashedPassword,
    }
    const result = await db.collection('user').insertOne(userData)
    client.close()
    res.status(201).json({ message: 'user is created successfully . !!!!' })
  }
}

export default handler
