const {Enigma, utils, eeConstants} = require('enigma-js/node');
const EnigmaContract = require('../build/enigma_contracts/SecretContractImpl.json')


const connect = async () => {

     
    
   const  enigma = new Enigma(
        EnigmaContract.networks['4447'].address,
        'http://localhost:3333',
      );
      enigma.admin()
      const taskFn = 'read_storage(string)';
      const taskArgs = [
        ['password1', 'string']
      ];
      const taskGasLimit = 100000;
      const taskGasPx = utils.toGrains(1);
      const contractAddr = fs.readFileSync('test/simple_addition.txt', 'utf-8');
      const result = await  enigma.computeTask(taskFn, taskArgs, taskGasLimit, taskGasPx, accounts[0], contractAddr)
     console.log(result)
}

connect()