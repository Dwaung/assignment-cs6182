
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext.jsx'

import { createPost } from '../api/posts.js'

export function CreatePost() {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')

  const [token] = useAuth()

  const queryClient = useQueryClient()

  const createPostMutation = useMutation({
    mutationFn: () => createPost(token, { title, contents }), // REMOVE AUTHOR
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  })


  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
  }

  if (!token) return <div>Please log in to create new posts.</div>


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
