import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import connect from "react-redux/es/connect/connect";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import getEnigmaInit from "./utils/getEnigmaInit";
import { utils, eeConstants } from 'enigma-js';
import { initializeEnigma, initializeAccounts, deployMillionairesProblem } from './actions';
import Table from 'react-bootstrap/Table';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showRegister: false,
            showAsset: false,
            loginEmail: '',
            loginPass: '',
            deploymentAddress: '',
            contractAddress: '',
            assetNames: '',
        };

        this.showRegister = this.showRegister.bind(this);
        this.showLogin = this.showLogin.bind(this);
        this.showAsset = this.showAsset.bind(this);
        this.loginEmailChange = this.loginEmailChange.bind(this);
        this.loginPassChange = this.loginPassChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    async componentDidMount() {
        // Initialize enigma-js client library (including web3)
        const enigma = await getEnigmaInit();
        // Create redux action to initialize set state variable containing enigma-js client library
        this.props.initializeEnigma(enigma);
        // Initialize unlocked accounts
        const accounts = await enigma.web3.eth.getAccounts();
        this.setState({ address: accounts[0] });
        // Create redux action to initialize set state variable containing unlocked accounts
        this.props.initializeAccounts(accounts);
        const secretContractCount = await enigma.enigmaContract.methods.countSecretContracts().call();
        const lastDeployedContract = (await enigma.enigmaContract.methods
            .getSecretContractAddresses(secretContractCount - 1, secretContractCount).call())[0];
        this.setState({ contractAddress: lastDeployedContract })
        console.log("set state to " + lastDeployedContract);
    }

    showRegister() {
        this.setState({
            showRegister: true,
            showAsset: false
        });
    };

    showLogin() {
        this.setState({
            showRegister: false,
            showAsset: false,
            loginPass: ''
        });
    };

    showAsset() {
        this.setState({
            showRegister: false,
            showAsset: true
        });
    }

    loginEmailChange(event) {
        this.setState({
            loginEmail: event.target.value
        });
    }

    loginPassChange(event) {
        this.setState({
            loginPass: event.target.value
        });
    }

    async handleLogin(event) {
        event.preventDefault();
        console.log("login email: " + this.state.loginEmail + ", login password: " + this.state.loginPass);

        let taskFn = 'read_storage(string)';
        let taskArgs = [
            [this.state.loginPass, 'string'],
        ]
        let taskGasLimit = 10000000;
        let taskGasPx = utils.toGrains(1);
        let task = await new Promise((resolve, reject) => {
            this.props.enigma.computeTask(taskFn, taskArgs, taskGasLimit, taskGasPx, this.state.address, this.state.contractAddress)
                .on(eeConstants.SEND_TASK_INPUT_RESULT, (result) => resolve(result))
                .on(eeConstants.ERROR, (error) => reject(error));
        });
        while (task.ethStatus === 1) {
            task = await this.props.enigma.getTaskRecordStatus(task);
            await sleep(1000);
        }
        if (task.ethStatus === 2) {
            // Get task result by passing in existing task - obtains the encrypted, abi-encoded output
            task = await new Promise((resolve, reject) => {
                this.props.enigma.getTaskResult(task)
                    .on(eeConstants.GET_TASK_RESULT_RESULT, (result) => resolve(result))
                    .on(eeConstants.ERROR, (error) => reject(error));
            });
            // Decrypt the task result - obtains the decrypted, abi-encoded output
            task = await this.props.enigma.decryptTaskResult(task);
            // Abi-decode the output to its desired components
            const assetNames = this.props.enigma.web3.eth.abi.decodeParameters([{
                type: 'string',
                name: 'assetNames',
            }], task.decryptedOutput).assetNames;
            console.log(assetNames);
            this.setState({
                assetNames: assetNames
            });
            this.showAsset();
        } else {
            console.log("login failed" + task.ethStatus);
        }
    }

    RegistrationPage() {
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
                    <RenderTable loginPass={this.state.loginPass} assetNames={this.state.assetNames} enigma={this.props.enigma} address={this.state.address} contractAddress={this.state.contractAddress} />
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
                                    <Form.Control type="email" placeholder="Enter email" value={this.state.loginEmail} onChange={this.loginEmailChange} />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Enter Your Password: </Form.Label>
                                    <Form.Control type="password" placeholder="Password" value={this.state.loginPass} onChange={this.loginPassChange} />
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
class RenderTable extends React.Component {
    constructor() {
        super();
        this.state = {
            newAssetName: '',
            assetNames: ''
        }
        this.assetNameChange = this.assetNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            assetNames: this.props.assetNames,
        })
    }

    createTable(event) {
            let table = []
            let result = this.state.assetNames;

            console.log(result);
            let dataList = result.split("|");
            for (const i in dataList) {
                let children = []
                children.push(<td colSpan="2" key={i}>{dataList[i]}</td>)
                table.push(<tr>{children}</tr>)
            }
            table.push(<tr>
                <td>
                    <Form.Control type="text" placeholder="Enter the name of your asset" value={this.state.newAssetName} onChange={this.assetNameChange} />
                </td>
                <td>
                    <input type="submit" value="Add" />
                </td>
            </tr>)
            return table
    }

   async handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.newAssetName);
        // call contract to add assets

        let taskFn = 'store_secret(string)';
        let taskArgs = [
            // [this.props.loginPass, 'string'],
            [this.state.newAssetName, 'string'],
        ]
        let taskGasLimit = 10000000;
        let taskGasPx = utils.toGrains(1);
        let task = await new Promise((resolve, reject) => {
            this.props.enigma.computeTask(taskFn, taskArgs, taskGasLimit, taskGasPx, this.props.address, this.props.contractAddress)
                .on(eeConstants.SEND_TASK_INPUT_RESULT, (result) => resolve(result))
                .on(eeConstants.ERROR, (error) => reject(error));
        });
        while (task.ethStatus === 1) {
            task = await this.props.enigma.getTaskRecordStatus(task);
            await sleep(1000);
        }
        if (task.ethStatus === 2) {
            // Get task result by passing in existing task - obtains the encrypted, abi-encoded output
            task = await new Promise((resolve, reject) => {
                this.props.enigma.getTaskResult(task)
                    .on(eeConstants.GET_TASK_RESULT_RESULT, (result) => resolve(result))
                    .on(eeConstants.ERROR, (error) => reject(error));
            });
            // this.forceUpdate();
            console.log("updated");
            //reload functions
            taskFn = 'read_storage(string)';
            taskArgs = [
                // [this.props.loginPass, 'string'],
                [this.props.loginPass, 'string'],
            ]
            taskGasLimit = 10000000;
            taskGasPx = utils.toGrains(1);
            task = await new Promise((resolve, reject) => {
                this.props.enigma.computeTask(taskFn, taskArgs, taskGasLimit, taskGasPx, this.props.address, this.props.contractAddress)
                    .on(eeConstants.SEND_TASK_INPUT_RESULT, (result) => resolve(result))
                    .on(eeConstants.ERROR, (error) => reject(error));
            });
            while (task.ethStatus === 1) {
                task = await this.props.enigma.getTaskRecordStatus(task);
                await sleep(1000);
            }
            if (task.ethStatus === 2) {
                // Get task result by passing in existing task - obtains the encrypted, abi-encoded output
                task = await new Promise((resolve, reject) => {
                    this.props.enigma.getTaskResult(task)
                        .on(eeConstants.GET_TASK_RESULT_RESULT, (result) => resolve(result))
                        .on(eeConstants.ERROR, (error) => reject(error));
                });
                task = await this.props.enigma.decryptTaskResult(task);
                // Abi-decode the output to its desired components
                const assetNames = this.props.enigma.web3.eth.abi.decodeParameters([{
                    type: 'string',
                    name: 'assetNames',
                }], task.decryptedOutput).assetNames;
                console.log(assetNames);
                this.setState({
                    assetNames: assetNames,
                    newAssetName: ''
                });
                this.forceUpdate();
            } else {
                console.log("retrieve failed" + task.ethStatus);
            }
        } else {
            console.log("update failed" + task.ethStatus);
        }
    }

    assetNameChange(event) {
            this.setState(
                {
                    newAssetName: event.target.value
                }
            );
    }

    render() {
        return (
            <div>
                <h2>Asset Management</h2>
                <form onSubmit={this.handleSubmit}>
                    <p>Address: 0x1234567891</p>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th colSpan="2">Asset Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.createTable()}
                        </tbody>
                    </Table>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { enigma: state.enigma }
};

export default connect(
    mapStateToProps, { initializeEnigma, initializeAccounts, deployMillionairesProblem }
)(App);