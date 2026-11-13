const API_URL = `${import.meta.env.VITE_BACKEND_URL}`

export const getPosts = async (queryParams) => {
  const res = await fetch(
    `${API_URL}/posts?${new URLSearchParams(queryParams)}`,
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`)
  }

  return await res.json()
}

export const createPost = async (token, post) => {
  const res = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || `Failed to create post: ${res.status}`)
  }

  return await res.json()
}