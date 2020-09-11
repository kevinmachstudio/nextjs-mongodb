import { connectToDatabase } from '../../../util/mongodb'
import { ObjectId } from 'mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase()

  const movies = await db
    .collection('movies')
    .find({ _id: ObjectId('573a1394f29313caabcdfa3e') })
    // .sort({ metacritic: -1 })
    // .limit(20)
    .toArray()

  res.json(movies)
}
