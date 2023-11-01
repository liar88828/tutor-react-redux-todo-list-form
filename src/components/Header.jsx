

import { Link } from 'react-router-dom'
export default function Header ()
{
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to='/'
          className="btn btn-ghost normal-case text-xl">Redux Blog</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link to='/'>Home</Link></li>
          <li><Link to='post'>Post</Link></li>
          <li>
            <details>
              <summary>
                Parent
              </summary>
              <ul className="p-2 bg-base-100">
                <li><a>Link 1</a></li>
                <li><a>Link 2</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  )
}
