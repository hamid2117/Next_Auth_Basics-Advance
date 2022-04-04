import { MongoClient } from 'mongodb'

const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.czdmu.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`

const connectToDatabase = async () => {
  const client = await MongoClient.connect(connectionString)
  return client
}

export { connectToDatabase }
