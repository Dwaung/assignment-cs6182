import { initDatabase } from '../db/init.js'

import { Post } from '../db/models/post.js'

import dotenv from 'dotenv'
dotenv.config()

await initDatabase()

const post = new Post({
    title: 'Hello Second Post!',
    author: 'Tony Stark',
    contents: 'This post Second POST.',
    tags: ['Frontend'],
})

await post.save()



const posts = await Post.find()
console.log(posts)