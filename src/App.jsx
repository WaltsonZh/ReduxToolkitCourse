import AddPostForm from './features/posts/AddPostForm'
import PostList from './features/posts/PostList'
import Layout from './components/Layout'
import SinglePostPage from './features/posts/SinglePostPage'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom/dist'
import EditPostForm from './features/posts/EditPostForm'

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<PostList />} />
        <Route path='post'>
          <Route index element={<AddPostForm />} />
          <Route path=':postId' element={<SinglePostPage />} />
          <Route path='edit/:postId' element={<EditPostForm />} />
        </Route>
      </Route>
    )
  )

  return <RouterProvider router={router} />
}
