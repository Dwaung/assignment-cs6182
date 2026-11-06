
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createPost } from '../api/posts.js'

export function CreatePost() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [contents, setContents] = useState('')

  const queryClient = useQueryClient()

  const createPostMutation = useMutation({
    mutationFn: () => createPost({ title, author, contents }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setTitle('')
      setAuthor('')
      setContents('')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="create-title">Title: </label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <br />

      <div>
        <label htmlFor="create-author">Author: </label>
        <input
          type="text"
          name="create-author"
          id="create-author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>

      <br />

      <label htmlFor="create-contents">Contents: </label>
      <textarea
        id="create-contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        required
      />

      <br />
      <br />

      <input
        type="submit"
        value={createPostMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!title}
      />

      {createPostMutation.isPending && <p>Creating post...</p>}

      {createPostMutation.isError && (
        <p>Error: {createPostMutation.error.message}</p>
      )}

      {createPostMutation.isSuccess && (
        <p>Post created successfully!</p>
      )}
    </form>
  )
}
