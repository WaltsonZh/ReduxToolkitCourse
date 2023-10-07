import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, getPostsError, getPostsStatus, selectAllPosts } from './postsSlice'
import { useEffect } from 'react'
import PostsExcerpt from './PostsExcerpt'

export default function PostList() {
  const dispatch = useDispatch()

  const posts = useSelector(selectAllPosts)
  const postsStatus = useSelector(getPostsStatus)
  const error = useSelector(getPostsError)

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postsStatus])

  let content
  if (postsStatus === 'loading') {
    content = <p>Loading...</p>
  } else if (postsStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map((post) => <PostsExcerpt key={post.id} post={post} />)
  } else if (postsStatus === 'failed') {
    content = <p>{error}</p>
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  )
}
