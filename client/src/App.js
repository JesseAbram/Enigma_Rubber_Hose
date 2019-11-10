import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login.js';

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
        return (
            <div>
                <Login />
            </div>
        );
    }
}

export default App;
