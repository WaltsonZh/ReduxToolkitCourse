import { Outlet } from 'react-router-dom/dist'
import Header from './Header'

export default function Layout() {
  return (
    <>
      <Header />
      <main className='App'>
        <Outlet />
      </main>
    </>
  )
}
