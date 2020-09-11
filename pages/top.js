// render the top 1000 movies from our MongoDB database.

import { connectToDatabase } from '../util/mongodb'

export default function Top ({ movies }) {
  return (
    <div>
      <h1>Top 1000 Movies of All Time</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <ul>
        {movies.map(movie => (
          <li>
            <h2>{movie.title}</h2>
            <h3>{movie.metacritic}</h3>
            <p>{movie.plot}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

// if we only called this method once when we built the application,
// so that even if that call takes a few seconds, it'll only ever happen once and our users won't be affected
export async function getStaticProps () {
  const { db } = await connectToDatabase()

  const movies = await db
    .collection('movies')
    .find({})
    .sort({ metacritic: -1 })
    .limit(1000)
    .toArray()

  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies))
    }
  }
}
