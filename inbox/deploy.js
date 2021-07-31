/* deployment requirements
    1. ABI(Interface)
    2. bytecode
    3. network which we are going to deploy(ganche, rinkby,..)  
    4. web3 library - to conenct with contract instance inside blockchain
    5. provider* - it acts like a communication interface btw web3 and bc (truffle-hdwallet-provider, ganache-cli-gancahe.provider())
    6. unlocked accounts - which will provide ether to deploy/interact wd contract inside bc (truffle-hdwallet-provider, ganache-cli)

    Note:
    truffle-hdwallet-provider - unlocking our account using mneumonics + acts like a provider  to connect with a outside node
    Infura - provides a way to interact wd sc in remote bc/ntwk(rinkby,main,roptsten..) 
            - without having the need to setup the bc in local env/
            - without infura setup of our node at local machine
*/
//
const {interface, bytecode} = require('./compile');
const Web3 = require('web3');
const HdWalletProvider = require('truffle-hdwallet-provider'); // specify - which account + which outside node we are about to connect
const provider = new HdWalletProvider(
    'now want decorate balcony proof trim camp eyebrow castle orbit chalk similar',
    'https://rinkeby.infura.io/v3/8188af0c72e04ceb9947f37232a237e7'
);
const web3 = new Web3(provider);
// const ganache = require("ganache-cli");
// const web3 = new Web3(ganache.provider()); 

//using a fn - to use async and await as we can't use await outside a fn
//else we can use promise
const deploy = async() => {
    //to get account
    const account =  await web3.eth.getAccounts();
    console.log('accounts[0]..................',account[0]);
    //to get ether balance
    const etherBalance = await web3.eth.getBalance(account[0]);
    console.log('etherBalance..................',etherBalance);

    const inboxContractInst = await new web3.eth.Contract(JSON.parse(interface))
                                .deploy({ data:bytecode, arguments:['Hello from deployment scriprt'] })
                                .send({ gas: '1000000', from: account[0]});

    console.log('inboxContractInst.............', inboxContractInst.options.address);
};
//fn call
deploy();

/*
accounts[0].................. 0xBDD84BA10e1945d888934576F002B6951997f11E
etherBalance.................. 18751000000000000000
inboxContractInst............. 0x4976a4b057720bF4b09805C6bdb215dB46B93684
*/