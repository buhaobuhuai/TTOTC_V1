// import Web3 from 'web3'
import store from '@/store'
import {
    ethers,
    verifyMessage,
    Wallet
} from 'ethers'
import erc20 from '@/abis/erc20.json';
const {
    ethereum
} = window;

import {
    provider
} from '../addresses';
import {
    Message
} from 'element-ui';

const MetaMaskPd = () => {
    return Boolean(ethereum && ethereum.isMetaMask);
}
// 钱包地址
const address = async () => {
    try {
        
        await provider.send("eth_requestAccounts", [])
        const signer = await provider.getSigner();
        const accounts = await signer.getAddress();
        // const accounts = await ethereum.request({
        //     method: 'eth_requestAccounts'
        // });
        // const account = accounts[0];
        console.log(accounts,1111)
        if (accounts != null) {
            sessionStorage.setItem('userKey', accounts)
            return true;
        } else
            return false
    } catch (error) {
        console.error(error);
        return false;
    }

}

const balanceSel = async (cs) => {
    console.log(cs.mc);
    // const provider = new ethers.BrowserProvider(window.ethereum);


    await provider.send("eth_requestAccounts", [])
    try {
        if (cs.mc === "eth" || cs.mc === "ETH" || cs.mc === undefined) {
            const senderBalanceBefore = await provider.getBalance(cs.zh); //账户1余额
            return ethers.formatEther(senderBalanceBefore)
        } else {
            const contract = new ethers.Contract(cs.hy, erc20, provider);
            const balance = await contract.balanceOf(cs.zh);
            return ethers.formatEther(balance)
        }
    } catch (e) {
        return 0
    }
}

const transferAccounts = async (cs) => {
    // const provider = new ethers.BrowserProvider(ethereum);
    console.log(0);
    await provider.send("eth_requestAccounts", [])
    console.log(1);

    const signer = await provider.getSigner();
    console.log(2);
    // const userPk = await signer.getAddress();

    // console.log(3);
    //abi: 数组 里面是string类型的函数
    // const ERC20_ABI = [
    //   "function name() view returns (string)",
    //   "function symbol() view returns (string)",
    //   "function totalSupply() view returns (uint256)",
    //   "function balanceOf(address) view returns (uint)",
    // ];
    // const abi = require("https://api.etherscan.io/api?module=contract&action=getabi&address=0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599")
    //合约转账
    // const contract = new ethers.Contract("0xdAC17F958D2ee523a2206206994597C13D831ec7", erc20, provider);
    //   console.log(await contract);
    //   const name = await contract.name();
    //   const symbol = await contract.symbol();
    //   const totalSupply = await contract.totalSupply();

    //   console.log(`Name: ${name}`);
    //   console.log(`Symbol: ${symbol}`);
    //   console.log(`Total Supply: ${totalSupply}\n`);
    // const balance = await contract.balanceOf(account1);
    //   console.log(`Balance Returned: ${balance}`);
    //   console.log(`Balance Formatted: ${ethers.formatEther(balance)}\n`);


    // const wallet = new ethers.Wallet(privateKey1, provider);
    // const senderBalanceBefore = await provider.getBalance(cs.bszh); //账户1余额
    // console.log(4);
    // const recieverBalanceBefore = await provider.getBalance(cs.yhzh); //账户2余额
    // console.log(`\nSender balance before: ${ethers.formatEther(senderBalanceBefore)}`)
    // console.log(`\nreciever balance before: ${ethers.formatEther(recieverBalanceBefore)}`)

    //转账
    let zzqb = null;
    if (cs.js === 2) {
        zzqb = cs.bszh
    } else {
        zzqb = cs.yhzh
    }

    try {
        let xs = "正在向账户’" + zzqb + "’转账" + cs.bzsl + " " + cs.bzmc + "，是否继续？";
        let sig = await signer.signMessage(xs)
        let jx = ethers.verifyMessage(xs, sig)
        console.log("verifyMessage:", jx)
        // const tx = null;
        if (cs.bzmc === "eth" || cs.bzmc === "ETH") {
            const tx = await signer.sendTransaction({
                to: zzqb,
                value: ethers.parseEther(cs.bzsl.toString())
            })
            const hx = await tx.wait();
            console.log(hx);
            return {
                code: 200,
                hxz: hx.hash
            }
        } else {
            const contract = new ethers.Contract(cs.hydz, erc20, signer);
            console.log(0);
            const amount = ethers.parseUnits(cs.bzsl.toString(), 18);
            console.log(1);
            const tx = await contract.transfer(zzqb, amount);
            console.log(2);
            const hx = await tx.wait();
            console.log(3);
            console.log(hx);
            return {
                code: 200,
                hxz: hx.hash
            }
        }
    } catch (e) {
        console.log("取消交易");
        return {
            code: 400,
        }
    }

    // const senderBalanceAfter = await provider.getBalance(cs.bszh); //账户1余额
    // const recieverBalanceAfter = await provider.getBalance(cs.yhzh); //账户2余额
    // console.log(`\nSender balance after: ${ethers.formatEther(senderBalanceAfter)}`)
    // console.log(`\nreciever balance after: ${ethers.formatEther(recieverBalanceAfter)}`)

}

const addressListen = () => {
    ethereum.on('accountsChanged',async function(accounts) {
        await provider.send("eth_requestAccounts", [])
        const signer = await provider.getSigner();
        const account = await signer.getAddress();
        // console.log(accounts, 0)
        // console.log(account, 2)
        // console.log(ethereum.selectedAddress, 1)




        sessionStorage.setItem('userKey', account)
        // sessionStorage.setItem('userKey', ethereum.selectedAddress)
        // store.dispatch('setUser', ethereum.selectedAddress)
        window.location.reload()
        // if (window.location.href.indexOf("#reloaded") == -1) {
        //     window.location.href = window.location.href +
        //         "#reloaded";
        //     window.location.reload();
        // }
    })
}
const networkListen = () => {
    ethereum.on('networkChanged', function(networkIDstring) {
        return networkIDstring
    })
}
const networkJudge = async() => {
    let chainId = await window.ethereum.request({ method: 'eth_chainId' });
    // if (chainId === 0x1 || chainId === '0x1') {
    //     return 1
    // } else {
    //     return 0
    // }
    return 1
}
export default {
    address,
    MetaMaskPd,
    transferAccounts,
    balanceSel,
    addressListen,
    networkListen,
    networkJudge
};
