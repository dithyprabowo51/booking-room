import React, { useState } from 'react'
import '../login/Login.css'

import axios from '../../lib/axios.js'

import { useHistory } from 'react-router-dom'

const Login = () => {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [user_password, setUser_password] = useState('')
  const [errorValidation, setErrorValidation] = useState('')

  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      await axios({
        url: '/register',
        method: 'POST',
        data: { email, user_password, name }
      })
      history.push('/')
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
          <h5 className="card-title text-center">Sign Up</h5>
          {
            errorValidation ?
              <p className="text-danger text-center">{errorValidation}</p>
              :
              null
          }
          <form onSubmit={handleRegister}>
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
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
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
              <button type="submit" className="btn btn-success">Register</button>
            </div>
            <div className="text-center mt-4" >
              {/* eslint-disable-next-line */}
              <a onClick={event => handleChangePage(event, '/')} href="">Already have an account ?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login