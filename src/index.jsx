import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
<<<<<<< HEAD
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { apiSlice } from './features/api/apiSlice.js'
=======
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { extendedApiSlice } from './features/posts/postsSlice.js'

store.dispatch(extendedApiSlice.endpoints.getPosts.initiate())
store.dispatch(extendedApiSlice.endpoints.getUsers.initiate())
>>>>>>> 07

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApiProvider api={apiSlice}>
    <App />
  </ApiProvider>,
)
