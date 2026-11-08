import {
    listAllPosts,
    listPostsByAuthor,
    listPostsByTag,
    getPostById,
    deletePost,
    updatePost,
    createPost,
} from '../services/posts.js'

export function postsRoutes(app) {
    // GET all posts, or filter by author/tag
    app.get('/api/v1/posts', async (req, res) => {
        const { sortBy, sortOrder, author, tag } = req.query
        const options = { sortBy, sortOrder }

        try {
            if (author && tag) {
                return res.status(400).json({
                    error: 'Query by either author or tag, not both'
                })
            } else if (author) {
                return res.json(await listPostsByAuthor(author, options))
            } else if (tag) {
                return res.json(await listPostsByTag(tag, options))
            } else {
                return res.json(await listAllPosts(options))
            }
        } catch (error) {
            console.error('Error listing posts:', error)
            return res.status(500).json({ error: error.message })
        }
    })

    // GET post by ID
    app.get('/api/v1/posts/:id', async (req, res) => {
        try {
            const post = await getPostById(req.params.id)

            if (!post) {
                return res.status(404).end()
            }

            return res.json(post)
        } catch (err) {
            console.error('Error getting post:', err)
            return res.status(500).json({ error: err.message })
        }
    })

    // CREATE post
    app.post('/api/v1/posts', async (req, res) => {
        try {
            console.log('Received post:', req.body)

            const post = await createPost(req.body)

            return res.status(201).json(post)
        } catch (err) {
            console.error('Error creating post:', err)

            return res.status(500).json({
                error: err.message,
                name: err.name
            })
        }
    })

    // UPDATE post
    app.patch('/api/v1/posts/:id', async (req, res) => {
        try {
            const post = await updatePost(req.params.id, req.body)

            if (!post) {
                return res.status(404).end()
            }

            return res.json(post)
        } catch (err) {
            console.error('Error updating post:', err)
            return res.status(500).json({ error: err.message })
        }
    })

    // DELETE post
    app.delete('/api/v1/posts/:id', async (req, res) => {
        try {
            const { deletedCount } = await deletePost(req.params.id)

            if (deletedCount === 0) {
                return res.sendStatus(404)
            }

            return res.status(204).end()
        } catch (err) {
            console.error('Error deleting post:', err)
            return res.status(500).json({ error: err.message })
        }
    })
}