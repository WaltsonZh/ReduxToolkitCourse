import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAddNewPostMutation } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'
import { useNavigate } from 'react-router-dom/dist'

export default function AddPostForm() {
  const [addNewPost, { isLoading }] = useAddNewPostMutation()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [userId, setUserId] = useState('')

  const users = useSelector(selectAllUsers)

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onbodyChanged = (e) => setBody(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

  const canSave = title && body && userId && !isLoading

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await addNewPost({ title, body, userId }).unwrap()

        setTitle('')
        setBody('')
        setUserId('')
        navigate('/')
      } catch (err) {
        console.error('Failed to save the post', err)
      }
    }
  }

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor='postTitle'>Post Title:</label>
        <input type='text' id='postTitle' name='postTitle' value={title} onChange={onTitleChanged} />
        <label htmlFor='postAuthor'>Author:</label>
        <select id='postAuthor' value={userId} onChange={onAuthorChanged}>
          <option value=''></option>
          {userOptions}
        </select>
        <label htmlFor='postbody'>body:</label>
        <textarea name='postbody' id='postbody' value={body} onChange={onbodyChanged} />
        <button type='button' onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}