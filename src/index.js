import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import App from './components/App';
import About from './components/About';


ReactDOM.render(
  <Router>
    <Route path="/" exact component={App}/>
    <Route path="/About" component={About}/>
  </Router>,
 
  document.getElementById('root')
);

serviceWorker.unregister();
