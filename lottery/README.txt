Lottery contract Scenario: 
-------------------------
    The lottery contract provides a quantity of money to one particular person randomly in that slot.
    The Lottery contract consists of 2 key persons 
        1. Manager - who creates, maintains and distribute money
        2. Players - who will buy Lottery 
    
Req:
----
1. we need manager - person who creates the contract - lottery.sol
2. we need a funciton through which we allow players to buy our contract - public- enterIntoLottery()
    validation - min balance to enter into lottery
3. we need a function to choose the winner randomly - random()
    validation - only accessed by manager and private
4. The distribution of money to winner should only be invoked by manager - pickWinner()
     validation - only accessed by manager and public
////////////////////////////////////////////////////////////////
Gotcha
------
1. we can't transmit array of arary incase of Numbers / array of string - since normal value of string is transmitted as arary
    - [1,2,3] - ok
    - ['red','blue'] - error: Nested dynamic arrays not implemented here
    - [[1,2,3],[5,6,7]] - error: Nested dynamic arrays not implemented here

It's not the issue with solidity or js - its issue with communication b/w them

behind the scene
----------------
1. string
---------
string public name  = 'suresh'
transmitted as -> ['s','u','r','e','s','h'] - work
['red','blue'] -> [['r','e','d'],['b','l','u','e']] - error

2.uint
------
uint public num = 123;
transmitted as -> 123 - work

uint[] public numArr = [1,2,3];
transmitted as -> [1,2,3] - work

uint public 2dArr = [[1,2,3],[5,6,7]] ;
transmitted as -> error
////////////////////////////////////////////////////////////////
Random generator
----------------
There is no method available to get random val in solidity
we need to go for work around for this 
////////////////////////////////////////////////////////////////
inbuild algo
-----------
keccak256, sha3