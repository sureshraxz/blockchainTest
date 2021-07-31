pragma solidity ^0.4.17;

contract Inbox{
    string public message;

    function Inbox(string initialMessage) public{
        message=initialMessage;
    }

    function setMessage(string newMessage) public{
        message=newMessage;
    }

}

// pragma solidity ^0.4.17;

// contract Inbox {
//     string public message;

//     function Inbox(string intialMsg) public {
//         message = initialMsg;
//     }

//     function setMessage(string userMsg) public {
//         message = userMsg;
//     }
// }
/*
Err: ':6:5: Warning: Defining constructors as functions with the same name 
        as the contract is deprecated. Use "constructor(...) { ... }"
    https://ethereum.stackexchange.com/questions/45972/ive-got-an-error-while-compiling-use-constructor-instead/45973
Remediation:
    function Inbox(string intialMsg) public{} --> constructor(string intialMsg) public{} 
 */
