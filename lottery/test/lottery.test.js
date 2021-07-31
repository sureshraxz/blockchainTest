const assert = require('assert');
// const {interface, bytecode} = require('../compile');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const lotteryCompiledCode = require('../compile');
const web3 = new Web3(ganache.provider());

let accounts;
let lotteryNtwInstance;

beforeEach(async() =>{
    accounts = await web3.eth.getAccounts();

    lotteryNtwInstance = await new web3.eth.Contract(JSON.parse(lotteryCompiledCode.interface))
                                .deploy({ data: lotteryCompiledCode.bytecode})
                                .send({ from:accounts[0], gas:'1000000'})
});

describe('lottery check', () => {
    // t1 - Is contract deployed successfully
    it('Is lottery contract deployed successfully', async() => {
        assert.ok(lotteryNtwInstance.options.address);
    })

    // t2 - Is player added to lottery 
    it('Is player added to lottery', async() => {
        await lotteryNtwInstance.methods.enterIntoLottery().send({
             from:accounts[0], 
             value: web3.utils.toWei('0.2','ether')
            });
        
        let player = await lotteryNtwInstance.methods.getPlayers().call({
            from:accounts[0]
        });
        
        assert.equal(accounts[0], player[0]);
    })

    //t3 - checking the minimun amount 
    it('has minimum amt for lottery', async() => {
        // let res = await lotteryNtwInstance.methods.enterIntoLottery().send({
        //     from: accounts[0],
        //     value: web3.utils.toWei('0','ether')
        // }); 
        // as it is 0 wei this test case - fail because we have an error
        // this error is what we are expeting as  a part of test
        // but the code stops here as test case failed - but actually that's passed the logic we need
        // in order to handle this we have - try and catch - in cases where we need are expecting error as o/p and pass the testcase
        try{
           await lotteryNtwInstance.methods.enterIntoLottery().send({
                from: accounts[0],
                value: web3.utils.toWei('0','ether')
            }); 
            // at this point test case throws error
            assert(false); // lets say for some reason it haven't reached catch block we are failing test.
        } catch (err){
            assert(err);
        }
    })

    it('is money transfered sucessfully to winner and reset of lottery', async() => {
        // balance of player before joinig ot lottery
        let initialBalance = await web3.eth.getBalance(accounts[0]);
        console.log('before joinig lottery.....',initialBalance);
        //joinig the lottery by invoking the entryIntoLottery fun
        await lotteryNtwInstance.methods.enterIntoLottery().send({
            from: accounts[0],
            value: web3.utils.toWei('2','ether')
        });
        //balance of player after joinig o lottery
        let postJoinigBalance = await web3.eth.getBalance(accounts[0]);
        console.log('after joinig lottery......',postJoinigBalance);

        console.log('diff 1',initialBalance - postJoinigBalance);

        //when player is winner of lottery 
        await lotteryNtwInstance.methods.pickWinner().send({
            from:accounts[0]
        })
        //checking balance of player post winning lottery
        let postWinningBalance = await web3.eth.getBalance(accounts[0]);
        console.log('post Winning Balance lottery......',postWinningBalance);

        console.log('diff 2',postWinningBalance - postJoinigBalance);   //profit

        let difference = postWinningBalance - postJoinigBalance;        

        assert(difference > web3.utils.toWei('1.8','ether'));
    })

});



/*Error
1) lottery check
       has minimum amt for lottery:
     c: VM Exception while processing transaction: revert
      at Function.c.fromResults (node_modules\ganache-cli\build\ganache-core.node.cli.js:4:192416)
      at w.processBlock (node_modules\ganache-cli\build\ganache-core.node.cli.js:42:50915)
      at processTicksAndRejections (internal/process/task_queues.js:93:5)
*/