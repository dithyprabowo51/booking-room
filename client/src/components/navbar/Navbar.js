import React from 'react'
import './Navbar.css'

import { useLocation, useHistory } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const history = useHistory()

  const handleChangePage = path => {
    history.push(path)
  }

  const handleLogout = () => {
    localStorage.clear()
    history.push('/')
  }

  return (
    <div>
      <ul className="nav justify-content-center bg-primary">
        {
          localStorage.getItem('user_role') === 'admin' ?
            <li
              className="nav-item link-text"
              onClick={() => handleChangePage('/list-user')}
            >
              <span
                className={location.pathname === '/list-user' ? 'nav-link text-warning' : 'nav-link'}
              >
                User
          </span>
            </li>
            :
            null
        }
        <li
          className="nav-item link-text"
          onClick={() => handleChangePage('/list-room')}
        >
          <span
            className={location.pathname === '/list-room' ? 'nav-link text-warning' : 'nav-link'}
          >
            Room
        </span>
        </li>
        <li className="nav-item link-text">
          <span
            className={location.pathname === '/list-booking' ? 'nav-link text-warning' : 'nav-link'}
            onClick={() => handleChangePage('/list-booking')}
          >
            Booking
        </span>
        </li>
        <li onClick={handleLogout} className="link-text logout">
          <span>Logout</span>
        </li>
      </ul>
    </div>
  )
}

export default Navbar