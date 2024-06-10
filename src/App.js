import './App.css'

import {Switch, Route, Redirect} from 'react-router-dom'

import TechEra from './components/TechEra'
import NotFound from './components/NotFound'
import TechListItemDetails from './components/TechListDetails'

const App = () => (
  <Switch>
    <Route exact path="/" component={TechEra} />
    <Route exact path="/courses/:id" component={TechListItemDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
