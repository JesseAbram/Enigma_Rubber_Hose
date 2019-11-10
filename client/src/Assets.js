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

function Assets() {
    return (
        <div>
            <h2>Asset Management</h2>
            <p>Address: 0x1234567891</p>
            {<RenderTable />}
        </div>
    )
}

class RenderTable extends React.Component {
    constructor() {
        super();
        this.state = {
            assetName: ''
        }
        this.assetNameChange = this.assetNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        console.log(this.state.assetName);
        // call contract to add assets
        event.preventDefault();
    }

    assetNameChange(event) {
        console.log(event.target)
        event && event.target &&
        this.setState(
            {
                assetName: event.target.value
            }
        );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th colspan="2">Asset Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="2">Mark</td>
                    </tr>
                    <tr>
                        <td colspan="2">Jacob</td>
                    </tr>
                    <tr>
                        <td colSpan = "2">Larry the Bird</td>
                    </tr>
                    <tr>
                        <td>
                            <Form.Control type="text"  placeholder="Enter the name of your asset" value={this.state.assetName} onChange={this.assetNameChange}/>
                        </td>
                        <td>
                            <input type="submit" value="Add" />
                        </td>
                    </tr>
                </tbody>
            </Table>
            </form>
        );
    }
}

export default Assets;