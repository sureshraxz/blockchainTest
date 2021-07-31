pragma solidity ^0.4.17;

contract Lottery{

    address public manager;
    address[] public players;

    //fn 1- manager address mapping - invoked during contract creation
    function Lottery() public{
        manager = msg.sender;   
    }

    //fn 2 - players entrty to lottery
    function enterIntoLottery() public payable{
        //validation 1 - min balance
        require(msg.value > 0.1 ether);
        players.push(msg.sender);
    }

    //fn 3 - random player selection logic
    function pseudoRandom() private view returns(uint){
        return uint(keccak256(block.difficulty, now, players));
    }

    //fn 4 - pick a winner
    function pickWinner() public{
        // validation 1 - manager check
        require(msg.sender == manager);
        //random index selection
        uint randomPlayerIndex = pseudoRandom() % players.length;
        // assigning all ether from this contract to winner
        players[randomPlayerIndex].transfer(this.balance);
        //reset lottery balance and players 
        players = new address[](0);     //initalization of dynamic array in solidity
    }
    //fn 5 - get all players 
    function getPlayers() public view returns(address[]){
        return players;
    }

    //fn 6 - fn modifier - to remove duplication -DOT REPEAT YOURSELF
    // modifier restricted() {
    //     require(msg.sender == manager);
    //     _;  //underscore will replace all the remaining code of that fn
    // }

}