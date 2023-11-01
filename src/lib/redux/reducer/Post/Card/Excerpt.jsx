// import { memo } from 'react'
import { useSelector } from 'react-redux'
import { selectPostById } from '../action'
import Card from './Card'
const Excerpt = ( { postId } ) =>
{
  const post = useSelector( state => selectPostById( state, postId ) )

  return <Card post={ post } />
}
// Excerpt = memo( Excerpt )
export default Excerpt