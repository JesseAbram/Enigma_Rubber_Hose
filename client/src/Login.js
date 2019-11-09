import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Registration } from './Registration.js';

export function Login() {
    return (
        <Container>
            <h2>Login</h2>
            <Row>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Address: </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Enter Your Password: </Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
            </Button>
                </Form>
            </Row>
        </Container>
    );
}