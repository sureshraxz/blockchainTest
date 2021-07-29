//from bytecode how to get source code of contract
//mocha
//js practise of higher functions
//constructor vs instance/reference variable
//npm run test
//* inorder to run mocha we need to map the mocha name into test property of package.json file.
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3"); //this is an constructor not an instance
const web3 = new Web3(ganache.provider()); //instance - we can have multiple isntances to connect to different ethereum ntws
const {interface, bytecode} = require('../compile'); //importing object of interface,byrecode from compile.js
//provider is a communication link btw library(web3) and ntw(ganache,..)
//each provider will have their specific methods
//this enables us to work with multiple ntws in a single project

//To deploy a contract we need to follow below steps
//1. we need the contracts bytecode - compilication provides this source code
//2. we need an account to deploy our contract - web3 module 

let accounts;
let inboxDeployedInst;

beforeEach(async () => {
  //instance of our default test accounts by ganache
  accounts = await web3.eth.getAccounts()

  //deploying the contract 
  inboxDeployedInst = await new web3.eth.Contract(JSON.parse(interface))  
                            .deploy({data: bytecode , arguments: ['Hi there !'] }) //passing the object - intialization to deploy sc
                            .send({ from: accounts[0] , gas: '1000000' }) // 1 million - transcation 

});

//testcase

describe('Inbox contract testcases', () => {
    it('deploys the contract', () => {
      //indicates successful deployment of contract into the ntw
      assert.ok(inboxDeployedInst.options.address);      
    });
    it('has default msg', async() =>{
      const defaultMsg = await inboxDeployedInst.methods.message().call();
      assert.strictEqual(defaultMsg,'Hi there !');
    });
    it('can change the msg',  async() =>{
      const defaultMsg = await inboxDeployedInst.methods.setMessage('bye').send({from:accounts[0]});
      //console.log(defaultMsg);  //Generally there is no need to return while interacting with contract - it returns only the 
                                  // transaction hash, block hash ... and not any msg.
      const newMsg = await inboxDeployedInst.methods.message().call();
      assert.strictEqual(newMsg,'bye');
    });
});


/*NOte
0. .Contract() - informing web3 about the contract functions and structure through ABI
1. .deploy() - only creates the js object that needs to be deployed 
2. .send() - this function is what actually deploys the contract into the ntw
*/

/*Err
https://stackoverflow.com/questions/55572357/cannot-destructure-property-interface-of-undefined-or-null
*/