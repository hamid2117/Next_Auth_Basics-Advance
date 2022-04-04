import { connectToDatabase } from '../../../helper/db'
import { hashPassword } from '../../../helper/auth'

const handler = async (req, res) => {
  let db
  try {
    let client = await connectToDatabase()
    db = client.db()
  } catch (error) {
    res.status(403).json({ message: "can't able to connect with database" })
    return
  }

  if (req.method == 'POST') {
    const { email, password } = req.body
    const hashedPassword = hashPassword(password)

    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(430).json({ message: 'Please send valid email and password ' })
      return
    }

    const userData = {
      email,
      password: hashedPassword,
    }
    const result = await db.collection('user').insertOne(userData)

    res.status(201).json({ message: 'user is created successfully . !!!!' })
  }
}

export default handler
