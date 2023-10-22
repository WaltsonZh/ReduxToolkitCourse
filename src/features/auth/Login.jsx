import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

export default function Login() {
  const userRef = useRef()
  const errRef = useRef()
  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrmsg] = useState('')
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrmsg('')
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const userData = await login({ user, pwd }).unwrap()
      // console.log(userData)
      dispatch(setCredentials({ ...userData, user }))
      setUser('')
      setPwd('')
      navigate('/welcome')
    } catch (err) {
      if (!err?.originalStatus) {
        setErrmsg('No Server Response')
      } else if (err.originalStatus?.status === 400) {
        setErrmsg('Missing Username or Password')
      } else if (err.originalStatus?.status === 401) {
        setErrmsg('Unauthorized')
      } else {
        setErrmsg('Login Failed')
      }
      errRef.current.focus()
    }
  }

  const handleUserInput = (e) => setUser(e.target.value)
  const handlePwdInput = (e) => setPwd(e.target.value)

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className='login'>
      <p className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
      <h1>Employee Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username:</label>
        <input type='text' id='username' ref={userRef} value={user} onChange={handleUserInput} autoComplete='off' required />
        <label htmlFor='password'>Password:</label>
        <input type='password' id='password' value={pwd} onChange={handlePwdInput} required />
        <button>Sign In</button>
      </form>
    </section>
  )
}
