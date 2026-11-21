
import express from 'express'
import { postsRoutes } from './routes/posts.js'
import { userRoutes } from './routes/users.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import { eventRoutes } from './routes/events.js'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { typeDefs, resolvers } from './graphql/index.js'
import { optionalAuth } from './middleware/jwt.js'
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})



const app = express()

// Enable CORS for the frontend
app.use(cors({
  origin: '*',
}))

apolloServer
  .start()
  .then(() => app.use('/graphql', optionalAuth, expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        return { auth: req.auth }
      },
    }),
))


// Parse JSON requests
app.use(bodyParser.json())

// Register API routes
postsRoutes(app)
userRoutes(app)
eventRoutes(app)


// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello from Express Nodemon!')
})

export { app }

//the port has to be public