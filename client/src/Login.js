// Imports - React
import React, { Component } from "react";
// Imports - Redux
import connect from "react-redux/es/connect/connect";
// Imports - Initialize Enigma
import getEnigmaInit from "./utils/getEnigmaInit.js";
// Imports - Components
import "./App.css";
// Imports - Actions (Redux)
import { initializeEnigma, initializeAccounts, deployMillionairesProblem } from './actions';
// Imports - Reducers (Redux)
import { computeRichestMillionaire } from "./actions";
// Imports - enigma-js client library utility packages
import { utils, eeConstants } from 'enigma-js';
import Button from 'react-bootstrap/Button';

class Login extends React.Component {
    constructor() {
        super();
        this.setState({ address: '', contractAddress: '' });
        this.readStorage = this.readStorage.bind(this);
    }
    async componentDidMount() {
        // Initialize enigma-js client library (including web3)
        const enigma = await getEnigmaInit();
        // Create redux action to initialize set state variable containing enigma-js client library
        this.props.initializeEnigma(enigma);
        // Initialize unlocked accounts
        const accounts = await enigma.web3.eth.getAccounts();
        this.setState({address: accounts[0]});
        // Create redux action to initialize set state variable containing unlocked accounts
        this.props.initializeAccounts(accounts);
        const secretContractCount = await enigma.enigmaContract.methods.countSecretContracts().call();
        const lastDeployedContract = (await enigma.enigmaContract.methods
            .getSecretContractAddresses(secretContractCount - 1, secretContractCount).call())[0];
        this.setState({ contractAddress: lastDeployedContract })
        console.log("set state to " + lastDeployedContract);
    }

    async readStorage() {
        let task;
        let taskFn = 'store_dummy(string)';
        let taskArgs = [
            ['test', 'string'],

        ];
        let taskFn2 = 'read_storage'
        let taskArgs2 = [
            ['password', 'string'],
        ]
        let taskGasLimit = 100000;
        let taskGasPx = utils.toGrains(1);
        task = await new Promise((resolve, reject) => {
            this.props.enigma.computeTask(taskFn, taskArgs, taskGasLimit, taskGasPx, this.state.address, this.state.contractAddress)
                .on(eeConstants.SEND_TASK_INPUT_RESULT, (result) => console.log(result))
                .on(eeConstants.ERROR, (error) => reject(error));
        });
    }

    render() {
        return (
            <Button
                onClick={this.readStorage}
                variant='outlined'
                color='secondary'>
                Submit
        </Button>
        );
    }
}

const mapStateToProps = (state) => {
    return { enigma: state.enigma }
};

export default connect(
    mapStateToProps, { initializeEnigma, initializeAccounts, deployMillionairesProblem }
)(Login);