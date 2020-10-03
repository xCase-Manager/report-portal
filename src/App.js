import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from './components/dashboard.component';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/dashboard"}>Report Portal</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/dashboard"}>Dashboard</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path='/' component={Dashboard}  />
              <Route exact path='/dashboard' component={Dashboard}  />
            </Switch>
          </div>
        </div>
      </div>
      <footer class="my-5 pt-5 text-muted text-center text-small">
        <p class="mb-1">&copy; 2019-2020 TCM</p>
      </footer>
    </Router>
  );
}
export default App;