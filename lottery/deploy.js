const {interface, bytecode} = require('../lottery/compile');
const Web3 = require('web3');
const HdWalletProvider = require('truffle-hdwallet-provider');
const provider = new HdWalletProvider(
    'now want decorate balcony proof trim camp eyebrow castle orbit chalk similar',
    'https://rinkeby.infura.io/v3/8188af0c72e04ceb9947f37232a237e7'
);
const web3 = new Web3(provider);

const deploy = async() =>{
    accounts = await web3.eth.getAccounts();

    lotteryNtwInstance = await new web3.eth.Contract(JSON.parse(lotteryCompiledCode.interface))
                                .deploy({ data: lotteryCompiledCode.bytecode})
                                .send({ from:accounts[0], gas:'1000000'})

    console.log('lotteryNtwInstance.............', lotteryNtwInstance.options.address);                                
}
deploy();