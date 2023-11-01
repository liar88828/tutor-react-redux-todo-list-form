

import { useSelector } from 'react-redux'
import { selectPostById } from '../action'

import { useParams } from 'react-router-dom'
import Card from './Card'

export default function SinglePost ()
{
  const { postId } = useParams()
  const post = useSelector( state => selectPostById( state, Number( postId ) ) )

  if ( !post )
  {
    return (
      <section>
        <h2>Post not Found!</h2>
      </section>
    )
  }
  return ( <Card
    post={ post }
    page={ 'single' }
    id={ postId}
  />
  )
}
