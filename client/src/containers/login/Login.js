import React, { useState } from 'react'
import './Login.css'

import axios from '../../lib/axios.js'

import { useHistory } from 'react-router-dom'

const Login = () => {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [user_password, setUser_password] = useState('')
  const [errorValidation, setErrorValidation] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios({
        url: '/login',
        method: 'POST',
        data: { email, user_password }
      })
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('user_role', data.user_role)
      history.push('/list-booking')
    } catch (err) {
      setErrorValidation(err?.response?.data?.message)
    }
  }

  const handleChangePage = (event, path) => {
    event.preventDefault()
    history.push(path)
  }

  return (
    <div className="login">
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title text-center">Login</h5>
          {
            errorValidation ?
              <p className="text-danger text-center">{errorValidation}</p>
              :
              null
          }
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={user_password}
                onChange={event => setUser_password(event.target.value)}
              />
            </div>
            <div className="mb-3 text-center">
              <button type="submit" className="btn btn-success">Login</button>
            </div>
            <div className="text-center mt-4" >
              {/* eslint-disable-next-line */}
              <a onClick={event => handleChangePage(event, '/register')} href="">Dont have an account ?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login