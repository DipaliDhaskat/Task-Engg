import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Provider } from 'react-redux'
import { Store } from './Store/Store'
import { Home } from './components/Home';
import { Details } from './components/Details';

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="details" element={<Details />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
