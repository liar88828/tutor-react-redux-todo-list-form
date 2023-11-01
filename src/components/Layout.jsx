import { Outlet } from 'react-router-dom'
import Header from './Header'
export default function Layout ()
{
  return ( <>
    <Header />
    <main className='flex justify-center items-center min-h-screen'>
      <Outlet /></main>
  </>
  )
}
