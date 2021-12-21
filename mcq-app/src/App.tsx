
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Provider } from 'react-redux';
import { Home } from './components/Home'
import { Store } from './store/Store';
import { Question } from './components/Question';
import { Result } from './components/Result';

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Question" component={Question} />
            <Route exact path="/Result" component={Result} />
          </Switch>
        </BrowserRouter>
      </Provider>

    </div>
  );
}

export default App;
