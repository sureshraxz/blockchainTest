import Web3 from "web3";

// //tut
// // const web3Instance = new Web3(window.web3.currentProvider);

// //doc
//   //on completion of this line - we get prompt from metamask
//   //this line is what actually connects our application to ethereum ntw using metamask
window.ethereum.request({ method: 'eth_requestAccounts' });

const web3Instance = new Web3(window.ethereum);

export default web3Instance;