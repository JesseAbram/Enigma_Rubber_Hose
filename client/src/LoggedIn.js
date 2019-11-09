import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Registration } from './Registration.js';
import { Login } from './Login';
import Table from 'react-bootstrap/Table';

function LoggedIn() {
    return (
        <div>
            <h1>Chicken Dinner 🐓🍗</h1>
            <h2>Logged In</h2>
            <p>Address: 0x1234567891</p>
            {<RenderTable />}
        </div>
    )
}

function RenderTable() {
    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Asset Type</th>
                    <th>Asset Description</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td colspan="2">Mark</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td colspan="2">Jacob</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan = "2">Larry the Bird</td>
                </tr>
                <tr>
                    <td>
                        <Form.Control placeholder="Enter the name of your asset" />
                    </td>
                    <td>
                        <Form.Control placeholder="Enter a description of your asset" />
                    </td>
                    <td>
                        <Button>Save</Button>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}

export default LoggedIn;