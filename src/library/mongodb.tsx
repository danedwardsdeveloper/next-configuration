import { MongoClient } from 'mongodb'

import { isDevelopment } from '@/library/environment'

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI missing')
}

const uri = process.env.MONGODB_URI

interface GlobalWithMongo extends Global {
  _mongoClientPromise?: Promise<MongoClient>
}

declare const globalWithMongo: GlobalWithMongo

let client: MongoClient
let mongoClient: Promise<MongoClient>

if (isDevelopment) {
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  mongoClient = globalWithMongo._mongoClientPromise!
} else {
  client = new MongoClient(uri)
  mongoClient = client.connect()
}

export default mongoClient
