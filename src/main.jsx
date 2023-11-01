import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './lib/redux/store.js'
import { Provider } from 'react-redux'
import { fetchUsers } from './lib/redux/reducer/User/action.js'

store.dispatch( fetchPosts() )// untuk menggantikan useEffect
store.dispatch( fetchUsers() )// untuk menggantikan useEffect


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { fetchPosts } from './lib/redux/reducer/Post/action.js'
ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
  // <React.StrictMode>
  <Provider store={ store }>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={ <App /> } />
      </Routes>
    </BrowserRouter>
  </Provider >
  // {/* </React.StrictMode>, */}
)
