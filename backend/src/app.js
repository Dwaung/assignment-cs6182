
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { postsRoutes } from './routes/posts.js'

const app = express()

app.use(bodyParser.json())
app.use(cors())

postsRoutes(app)

app.get('/', (req, res) => {
    res.send('Hello from Express Nodemon!')
})

export { app }

//the port has to be public