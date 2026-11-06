export const getPosts = async (queryParams) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts?` +
      new URLSearchParams(queryParams),
  )
  return await res.json()
}



export async function createPost(post) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    }
  )

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create post: ${response.status} ${error}`)
  }

  return response.json()
}
