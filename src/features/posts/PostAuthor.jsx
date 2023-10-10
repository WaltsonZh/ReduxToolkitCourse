import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import { Link } from 'react-router-dom/dist'

export default function PostAuthor(prop) {
  const { userId } = prop
  const users = useSelector(selectAllUsers)

  const author = users.find((user) => user.id === userId)

  return <span>by {author ? <Link to={`/user/${userId}`}>{author.name}</Link> : 'Unknown author'}</span>
}