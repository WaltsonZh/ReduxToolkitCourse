import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom/dist'
import { deletePost, selectPostById, updatePost } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'
import { useState } from 'react'

export default function EditPostForm() {
  const { postId } = useParams()
  const navigate = useNavigate()

  const post = useSelector((state) => selectPostById(state, Number(postId)))
  const users = useSelector(selectAllUsers)

  const [title, setTitle] = useState(post?.title)
  const [body, setBody] = useState(post?.body)
  const [userId, setUserId] = useState(post?.userId)
  const [requestStatus, setRequestStatus] = useState('idle')

  const dispatch = useDispatch()

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onBodyChanged = (e) => setBody(e.target.value)
  const onAuthorChanged = (e) => setUserId(Number(e.target.value))

  const canSave = title && body && userId && requestStatus === 'idle'

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus('Pending')
        dispatch(updatePost({ id: post.id, title, body, userId, reactions: post.reactions })).unwrap()

        setTitle('')
        setBody('')
        setUserId('')
        navigate(`/post/${postId}`)
      } catch (err) {
        console.error('Failed to save the post', err)
      } finally {
        setRequestStatus('idle')
      }
    }
  }

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  const onDeletePostClicked = () => {
    try {
      setRequestStatus('Pending')
      dispatch(deletePost({ id: post.id })).unwrap()

      setTitle('')
      setBody('')
      setUserId('')
      navigate('/')
    } catch (err) {
      console.error('Failed to delete the post', err)
    } finally {
      setRequestStatus('idle')
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor='postTitle'>Post Title:</label>
        <input type='text' id='postTitle' name='postTitle' value={title} onChange={onTitleChanged} />
        <label htmlFor='postAuthor'>Author:</label>
        <select name='postAuthor' id='postAuthor' defaultValue={userId} onChange={onAuthorChanged}>
          <option value=''></option>
          {userOptions}
        </select>
        <label htmlFor='postBody'></label>
        <textarea name='postBody' id='postBody' value={body} onChange={onBodyChanged}></textarea>
        <button type='button' onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
        <button className="deleteButton" type='button' onClick={onDeletePostClicked}>
          Delete Post
        </button>
      </form>
    </section>
  )
}
