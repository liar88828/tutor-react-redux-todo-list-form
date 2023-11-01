import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { selectAllUsers, selectUserById } from './action'
import { selectPostByUser } from '../Post/action'

export default function UserPage ()
{

  const { userId } = useParams()

  const user = useSelector( state => selectUserById( state, Number( userId ) ) )

  // const postsForUser = useSelector( state =>
  // {
  //   const allPosts = selectAllUsers( state )
  //   return allPosts.filter( p => p.userId === Number( userId ) )
  // } )

  const postsForUser = useSelector( state => selectPostByUser( state, Number( userId ) ) )


  const postTitles = postsForUser.map( post => <li key={ post.id }>
    <Link to={ `/post/${ post.id }` }>{ post.title } </Link>
  </li> )

  return (
    <section>
      <h2 >{ user.name }</h2>
      <ol>{ postTitles }</ol>
    </section>
  )
}
