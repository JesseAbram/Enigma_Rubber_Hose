import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Registration } from './Registration.js';
import { Login } from './Login';
import Assets from './Assets';

class App extends Component{
    state = {
        showRegister: false,
        showAsset: false
    };

    showRegister () {
        this.setStage({
            showRegister: true,
            showAsset: false
        });
    };

    showLogin () {
        this.setStage({
            showRegister: false,
            showAsset: false
        });
    };

    showAsset () {
        this.setStage({
            showRegister: false,
            showAsset: true
        });
    }

    header () {
        return (
            <p>"header"</p>
        )
    }


    render() {
        if (this.state.showAsset) {
            return (
                <div className="App">
                    <h1>Chicken Dinner 🐓🍗</h1>
                    <Assets />
                </div>
            )
        } else if (this.state.showRegister) {
            return (
                <div className="App">
                <h1>Chicken Dinner 🐓🍗</h1>
                <Registration />
                </div>
            )
        } else {
            return (
                <div className="App">
                <h1>Chicken Dinner 🐓🍗</h1>
                <Login/>
                </div>
            )
        }
    }
}

export default App;
