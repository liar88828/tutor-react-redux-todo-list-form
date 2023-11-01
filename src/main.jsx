import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './lib/redux/store.js'
import { Provider } from 'react-redux'
import { fetchUsers } from './lib/redux/reducer/User/action.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { apiSlice } from './lib/redux/apis.js'
import { extendedApiPost } from './lib/redux/reducer/Post/action.js'

store.dispatch( extendedApiPost.endpoints.getPosts.initiate() )// untuk menggantikan useEffect
store.dispatch( fetchUsers() )// untuk menggantikan useEffect


ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
  // <React.StrictMode>
  <ApiProvider api={ apiSlice }>
    <Provider store={ store }>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={ <App /> } />
        </Routes>
      </BrowserRouter>
    </Provider >
  </ApiProvider>
  // {/* </React.StrictMode>, */}
)
