import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

import { store } from './app/store'
import { Provider } from 'react-redux/es'

import { createBrowserRouter, createRoutesFromElements, RouterProvider, Routes, Route } from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/*' element={<App />}></Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
