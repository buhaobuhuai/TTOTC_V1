import Web3 from 'web3'
import abi from '@/abis/erc20.json';

const web3 = new Web3(new Web3.providers.HttpProvider("https://rpc.ankr.com/eth_goerli"))
// 合约地址
const contractAddress = "0x7FCCF800568747b178c6cBbe4Bf3d147df75ac61";

// 账号
const currentAccount = sessionStorage.getItem('userKey') //"0x4e9d5c58d8d6f02FFe5A6EF10CB804FfFB556bBb";

// 定义合约
const myContract = new web3.eth.Contract(abi, contractAddress);


const getWalletUser = async () =>
    {
        console.log(0)
        const accounts = await
        ethereum.request({
            method: 'eth_requestAccounts'
        });
        console.log(accounts)
        const account = accounts[0];
        sessionStorage.setItem('userKey', account)
        return account
        // getETH()
    }

const getETH = async () =>
    {
        // console.log(currentAccount)
        web3.eth.getBalance(currentAccount, (err, wei) => {
            let balance = web3.utils.fromWei(wei, 'ether')
            balance = Number(balance).toFixed(2) //.replace(/^(\-)*(\d+)\.(\d\d).*$/)
            return balance
        });
        // 查看某个账号的代币余额
        // myContract.methods.balanceOf(contractAddress).call({from: currentAccount}, function(error, result){
        //     if(!error) {
        //         console.log(result);
        //     } else {
        //         console.log(error);
        //     }
        // });
        // const web3 = new Web3(Web3.currentProvider)
        // console.log(web3.eth.accounts[0])
        // const fromAddress = web3.eth.accounts()
        // console.log(web3.eth.getBalance(fromAddress[0])) 
        // console.log(fromAddress)
        // web3.eth.getBalance(currentAccount, (err, res) => {
        // 	if (!err) {
        // 		alert("ETH余额==" + res / Math.pow(10, 18));
        // 		console.Log(res)
        // 	}
        // })
    }

export default {
    getWalletUser,
    getETH
};
