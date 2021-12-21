import './App.css';
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import {Home} from  './components/Home';
import {AsteroidInfo} from  './components/AstroidInfo';
import {Store} from './Store/Store'

function App() {
  return (
    <div className="App">
    <Provider store={Store}>
<Router>
    <Switch>
      <Route exact path="/" component={Home} />
       <Route exact path="/AsteroidInfo/:id" component={AsteroidInfo} />
    </Switch>
 </Router>
  </Provider>
    </div>
  );
}

export default App;
