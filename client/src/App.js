// Components
import Navbar from './components/navbar/Navbar.js'
import ListRoom from './containers/listRoom/ListRoom.js'
import ListBooking from './containers/booking/ListBooking.js'
import ListUser from './containers/user/ListUser.js'
import Login from './containers/login/Login.js'
import Register from './containers/register/Register.js'

// Router
import { Switch, useLocation } from 'react-router-dom'
import { GuardProvider, GuardedRoute } from 'react-router-guards'

const requireLogin = (to, from, next) => {
  if (to.location.pathname !== '/') {
    if (to.location.pathname === '/register') {
      if (!localStorage.getItem('access_token')) {
        next()
      } else {
        next.redirect('/list-booking')
      }
    } else {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next.redirect('/')
      }
    }
  } else {
    if (localStorage.getItem('access_token')) {
      next.redirect('/list-booking')
    } else {
      next()
    }
  }
};

function App() {
  const location = useLocation()
  return (
    <div>
      <GuardProvider guards={[requireLogin]}>
        {
          location.pathname !== '/' ?
            <Navbar />
            :
            null
        }
        <Switch>
          <GuardedRoute path="/list-room">
            <ListRoom />
          </GuardedRoute>
          <GuardedRoute path="/list-booking">
            <ListBooking />
          </GuardedRoute>
          <GuardedRoute path="/list-user">
            {
              localStorage.getItem('user_role') === 'admin' ?
                <ListUser />
                :
                null
            }
          </GuardedRoute>
          <GuardedRoute path="/register">
            <Register />
          </GuardedRoute>
          <GuardedRoute path="/" exact>
            <Login />
          </GuardedRoute>
        </Switch>
      </GuardProvider>
    </div>
  )
}

export default App;
