import { useGetUsersQuery } from './usersApiSlice'
import { Link } from 'react-router-dom'

export default function UsersList() {
  const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery()

  return isLoading ? (
    <p>Loading...</p>
  ) : isSuccess ? (
    <section className='users'>
      <h1>User List</h1>
      <ul>
        {users.map((user, i) => (
          <li key={i}>{user.username}</li>
        ))}
      </ul>
      <Link to='/welcome'>Back to Welcome</Link>
    </section>
  ) : isError ? (
    <p>{JSON.stringify(error)}</p>
  ) : null
}
