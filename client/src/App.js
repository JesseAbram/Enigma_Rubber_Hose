import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Registration } from './Registration.js';
import { Login } from './Login';
import LoggedIn from './LoggedIn';

function App() {
  return (
    <div className="App">
      {/* <Registration/> */}
      {/* <Login/> */}
      { <LoggedIn /> }
    </div>
  );
}

export default App;
