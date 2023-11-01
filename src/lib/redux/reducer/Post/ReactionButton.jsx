import { useDispatch } from 'react-redux';
import { reactionAdded } from './action';
import { reactionEmoji } from './Excerpt';

export function ReactionButton ( { post } )
{
  const dispatch = useDispatch();
  // console.log( post )
  const reactionButton = Object.entries( reactionEmoji ).map( ( [ name, emoji ] ) =>
  {
    // console.log( emoji )
    return (
      <button key={ name }
        type='button'
        onClick={ () => dispatch( reactionAdded(
          {
            postId: post.id,
            reaction: name
          } ) ) }

      >
        { emoji } { post.reactions[ name ] }
      </button>
    );
  } );
  return (
    <div className='space-x-2'>
      { reactionButton }
    </div>
  );
}
