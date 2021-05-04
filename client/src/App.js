// Components
import Navbar from './components/navbar/Navbar.js'
import ListRoom from './containers/listRoom/ListRoom.js'

// Router
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/list-room">
          <ListRoom />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
