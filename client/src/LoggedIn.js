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

class RenderTable extends React.Component {
    constructor() {
        super();
        this.state = {
            assetName: '',
            assetDesc: ''
        }
        this.assetNameChange = this.assetNameChange.bind(this);
        this.assetDescChange = this.assetDescChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        console.log(this.state.assetName);
        console.log(this.state.assetDesc);
        event.preventDefault();
    }

    assetNameChange(event) {
        console.log(event.target)
        event && event.target &&
        this.setState(
            {
                assetName: event.target.value
                // assetDesc: event.target.assetDesc
            }
        );
      }

      assetDescChange(event) {
        console.log(event.target)
        event && event.target &&
        this.setState(
            {
                // assetName: event.target.value
                assetDesc: event.target.value
            }
        );
      }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Asset Type</th>
                        <th colspan="2">Asset Description</th>
                        {/* <th></th> */}
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
                            <input type="text"  placeholder="Enter the name of your asset" value={this.state.assetName} onChange={this.assetNameChange}/>
                        </td>
                        <td>
                            <input type="text"  placeholder="Enter a description of your asset" value={this.state.assetDesc} onChange={this.assetDescChange}/>
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

export default LoggedIn;