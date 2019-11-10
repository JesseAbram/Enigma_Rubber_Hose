import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
// import { Registration } from './Registration.js';
// import { Login } from './Login';
import Assets from './Assets';

class App extends Component{
    constructor(props) {
        super(props);

        this.state = {
            showRegister: false,
            showAsset: false,
            loginEmail: '',
            loginPass: ''
        };

        this.showRegister = this.showRegister.bind(this);
        this.showLogin = this.showLogin.bind(this);
        this.showAsset = this.showAsset.bind(this);
        this.loginEmailChange = this.loginEmailChange.bind(this);
        this.loginPassChange = this.loginPassChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    showRegister () {
        this.setState({
            showRegister: true,
            showAsset: false
        });
    };

    showLogin () {
        this.setState({
            showRegister: false,
            showAsset: false
        });
    };

    showAsset () {
        this.setState({
            showRegister: false,
            showAsset: true
        });
    }

    loginEmailChange (event) {
        this.setState({
            loginEmail: event.target.value
        });
    }

    loginPassChange (event) {
        this.setState({
            loginPass: event.target.value
        });
    }


    handleLogin (event) {
        event.preventDefault();
        console.log("login email: " + this.state.loginEmail + ", login password: " + this.state.loginPass);
        // call smart contract here, supply email and password
        this.showAsset();
    }

    RegistrationPage () {
        return (
            <Container>
                <h2>Registration</h2>
                <Row>
                    <Form className="margin-auto">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Address: </Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Fake Password: </Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                            <Form.Text className="text-muted">
                                REMEMBER THIS PASSWORD!!
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Real Password: </Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                            <Form.Text className="text-muted">
                                REMEMBER THIS PASSWORD!!
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Row>
            </Container>
        );
    }

    render() {
        if (this.state.showAsset) {
            return (
                <div className="App">
                    <h1>Chicken Dinner 🐓🍗</h1>
                    <a href="#" onClick={this.showLogin}>Log out</a>
                    <Assets />
                </div>
            )
        } else if (this.state.showRegister) {
            return (
                <div className="App">
                    <h1>Chicken Dinner 🐓🍗</h1>
                    <a href="#" onClick={this.showLogin}>Login</a>
                    <a href="#" onClick={this.showAsset} className="demo">Demo</a>
                    <this.RegistrationPage />
                </div>
            )
        } else {
            return (
                <div className="App">
                    <h1>Chicken Dinner 🐓🍗</h1>
                    <a href="#" onClick={this.showRegister}>Register</a>
                    <a href="#" onClick={this.showAsset} className="demo">Demo</a>
                    <Container>
                    <h2>Login</h2>
                    <Row>
                        <Form className="margin-auto" onSubmit={this.handleLogin}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Address: </Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={this.state.loginEmail} onChange={this.loginEmailChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Enter Your Password: </Form.Label>
                                <Form.Control type="password" placeholder="Password" value={this.state.loginPass} onChange={this.loginPassChange}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                    </Button>
                        </Form>
                    </Row>
                </Container>
                </div>
            )
        }
    }
}

export default App;
