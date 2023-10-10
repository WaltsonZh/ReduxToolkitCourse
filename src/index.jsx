import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { extendedApiSlice } from './features/posts/postsSlice.js'

store.dispatch(extendedApiSlice.endpoints.getPosts.initiate())
store.dispatch(extendedApiSlice.endpoints.getUsers.initiate())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
