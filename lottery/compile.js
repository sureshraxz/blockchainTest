const fs = require('fs');
const path = require('path');
const solc = require('solc');

const lotteryContractPath = path.resolve(__dirname,'contract','lottery.sol');

const lotterySourceCode = fs.readFileSync(lotteryContractPath,'utf-8');

const lotteryCompiledCode = solc.compile(lotterySourceCode,1).contracts[':Lottery'];

module.exports = lotteryCompiledCode;
