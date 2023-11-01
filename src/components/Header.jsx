import { Link } from 'react-router-dom'
export default function Header ()
{

  // const dispatch = useDispatch()
  // const count = useSelector( getCount )

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to='/'
          className="btn btn-ghost normal-case text-xl">Redux Blog</Link>
      </div>
      <div className="flex-none">

        <button
          className='btn btn-primary'
          // onClick={ () => dispatch( increasedCount() ) }>
        // { count }>
      >
        </button>
        <ul className="menu menu-horizontal px-1">
          <li><Link to='/'>Home</Link></li>
          <li><Link to='todo'>Todo</Link></li>
          <li><Link to='post'>Post</Link></li>

          <li>
            <details>
              <summary>
                Extra
              </summary>
              <ul className="p-2 bg-base-100">
                <li><Link to='post'>Post</Link></li>
                <li><Link to='user'>users</Link></li>
              </ul>
            </details>
          </li>
        </ul>

      </div>
    </div>
  )
}
