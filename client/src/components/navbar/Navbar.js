import React from 'react'
import './Navbar.css'

import { useLocation, useHistory } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const history = useHistory()

  const handleChangePage = path => {
    history.push(path)
  }

  return (
    <div>
      <ul className="nav justify-content-center bg-primary">
        <li className="nav-item link-text">
          <span
            className={location.pathname === '/user' ? 'nav-link text-warning' : 'nav-link'}
          >
            User
        </span>
        </li>
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
            className={location.pathname === '/booking' ? 'nav-link text-warning' : 'nav-link'}
          >
            Booking
        </span>
        </li>
      </ul>
    </div>
  )
}

export default Navbar