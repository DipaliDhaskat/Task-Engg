import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router ,
  Switch,
  Route, 
} from "react-router-dom";

import { Provider } from 'react-redux'
import {Store} from './Store/Store'

import {Home} from './components/Home'
import {CountryInfo} from './components/CountryInfo';
import {WeatherDetails} from './components/WeatherDetails';

function App() {
  return (
    <div className="App">

     <Provider store={Store}>
     <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/CountryInfo/:name' component={CountryInfo} />
           <Route exact path='/WeatherDetails/:capital' component={WeatherDetails} />
        </Switch>
    </Router>
  </Provider>
     
    </div>
  );
}
export default App;
