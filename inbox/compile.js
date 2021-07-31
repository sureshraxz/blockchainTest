const path = require('path');
const fs = require('fs');
const solc=require('solc');//npm install --save solc
//where does these path,fs is stored...
//where does this module.exports work? where it will store the data like clipborad incase of win+print 

const inboxPath = path.resolve(__dirname,'contracts','Inbox.sol');
const source = fs.readFileSync(inboxPath,'utf8');

//exporting -->contract definition [2 properties = interface - ABI(JSON), bytecode - raw code to deploy ]
// console.log(solc.compile(source,1).contracts[':Inbox']);
module.exports = solc.compile(source,1).contracts[':Inbox'];
