import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from './components/dashboard.component';

function App() {
  return (
    <Router>
      <div className="App">
            <Switch>
              <Route exact path='/' component={Dashboard}  />
            </Switch>
          </div>     
    </Router>
  );
}
export default App;