
import express from 'express'
import { postsRoutes } from './routes/posts.js'
import { userRoutes } from './routes/users.js'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()

// Enable CORS for the frontend
app.use(cors({
  origin: '*',
}))

// Parse JSON requests
app.use(bodyParser.json())

// Register API routes
postsRoutes(app)
userRoutes(app)

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello from Express Nodemon!')
})

export { app }

//the port has to be public