
import {ethers} from 'ethers'
import GatorAbis from '../../abis/gator.json';
import MarketorAbi from '../../abis/action.json';
import CoinAbi from '../../abis/CoinAbi.json';
import ThingAbi from '../../abis/ThingAbi.json';

import {gatorAddress,marketorAddress,coinAddress,thingAddress,provider} from '../addresses';

// const { ethereum } = window;

// 测试
// const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
// 主网
// const provider= new ethers.BrowserProvider(ethereum);

// 读写
async function Conctract(address,abis) {
    const signer = await provider.getSigner();
    const Conctract = new ethers.Contract(address, abis, signer);
    return Conctract;
}
// 只读
async function ReadContact(address,abis) {
    const Conctract = new ethers.Contract(address, abis, provider);
    return Conctract;
}

// 交易待提列表
const transactionsList = async () => {
        const param = [];
        param.push(sessionStorage.getItem("userKey"))
    // console.log(cs)
    ReadContact(gatorAddress,GatorAbis).then(async (conctr)=>{
       return await conctr.gateList.staticCallResult(param)
    }).then((result)=>{
        let name=['hy','qb','sl','jc','gj','ip','sj','scs','mhs','yhs']
        let data={}
        result.map((v,i)=>{
            data[name[i]]=v
        })
        return data
    })
}

// 交易记录列表
const historyList = async () => {
        const param = [];
        param.push(sessionStorage.getItem("userKey"))
    // console.log(cs)
    ReadContact(gatorAddress,GatorAbis).then(async (conctr)=>{
       return await conctr.gateList.staticCallResult(param)
    }).then((result)=>{
        let name=['hy','qb','sl','jc','gj','ip','sj','scs','mhs','yhs']
        let data={}
        result.map((v,i)=>{
            data[name[i]]=v
        })
        return data
    })
}



// 门户冻结
const lockGateby = async () => {
    const Contact = await Conctract(gatorAddress,GatorAbis);
    
        const param = [];
        param.push(sessionStorage.getItem("userKey"))
        
    // const param1 = ethers.decodeBytes32String(csz);
    // console.log(`编码结果： ${param1}`)
    console.log(param)
        await Contact.lockGatebyGater(param)
    // let addresss = "0x5ECF68A49d7F78547C6"
    // const param1 = ethers.encodeBytes32String("fasfsa");
    // console.log(`编码结果： ${param1}`)
}
// 门户解冻
const unlockGateby = async () => {
    const Contact = await Conctract(gatorAddress,GatorAbis);
        const param = [];
        param.push(sessionStorage.getItem("userKey"))
        await Contact.unlockGatebyGater(param)
}
// 门户更新
const upGateby = async (cs) => {
    const Contact = await Conctract(gatorAddress,GatorAbis);
        await Contact.updateGatebyGator(cs)
}

// 币对列表
const getCoinPairList = async (cs) => {
        const param = [];
        param.push(cs)
    console.log(cs)
    ReadContact(coinAddress,CoinAbi).then(async (conctr)=>{
       return await conctr.getCoinPairInfo.staticCallResult(param)
    }).then((result)=>{
        let name=['hy','qb','sl','jc','gj','ip','sj','scs','mhs','yhs']
        let data={}
        result.map((v,i)=>{
            data[name[i]]=v
        })
        return data
    })
}

// 币对添加
const getAddCoinPair = async (cs) => {
    const Contact = await Conctract(coinAddress,CoinAbi);
    console.log(cs)
        await Contact.addCoinbyMarketor(cs)
}

// 虚拟币列表
const getCionList = async (cs) => {
        const param = [];
        param.push(cs)
    console.log(cs)
    ReadContact(coinAddress,CoinAbi).then(async (conctr)=>{
       return await conctr.getCoinInfo.staticCallResult(param)
    }).then((result)=>{
        let name=['hy','qb','sl','jc','gj','ip','sj','scs','mhs','yhs']
        let data={}
        result.map((v,i)=>{
            data[name[i]]=v
        })
        return data
    })
}

// 虚拟币添加
const getAddCion = async (cs) => {
    const Contact = await Conctract(coinAddress,CoinAbi);
    console.log(cs)
        await Contact.addCoinbyGator(cs)
}
// 虚拟币添加基本信息
const getAddCionDetail = async (cs) => {
    const Contact = await Conctract(coinAddress,CoinAbi);
    console.log(cs)
        await Contact.addCoinbyGator(cs)
}
// 虚拟币更新
const upCionDetail = async (cs) => {
    const Contact = await Conctract(coinAddress,CoinAbi);
    console.log(cs)
        await Contact.updateCoinbyGator(cs)
}
// 虚拟币删除
const delCion = async (cs) => {
    const Contact = await Conctract(coinAddress,CoinAbi);
        const param = [];
        param.push(cs)
    console.log(cs)
        await Contact.delCoinbyGator(param)
}
// 虚拟币冻结
const lockCion = async (cs) => {
    const Contact = await Conctract(coinAddress,CoinAbi);
        const param = [];
        param.push(cs)
    console.log(cs)
        await Contact.lockCoinbyGator(param)
}
// 虚拟币解冻
const unlockCion = async (cs) => {
    const Contact = await Conctract(coinAddress,CoinAbi);
        const param = [];
        param.push(cs)
    console.log(cs)
        await Contact.unlockCoinbyGator(param)
}


// 物品列表
const getThingList = async (cs) => {
        const param = [];
        param.push(cs)
    console.log(cs)
    ReadContact(thingAddress,ThingAbi).then(async (conctr)=>{
       return await conctr.getThingInfo.staticCallResult(param)
    }).then((result)=>{
        let name=['hy','qb','sl','jc','gj','ip','sj','scs','mhs','yhs']
        let data={}
        result.map((v,i)=>{
            data[name[i]]=v
        })
        return data
    })
}

// 物品添加
const getAddThing = async (cs) => {
    const Contact = await Conctract(thingAddress,ThingAbi);
    console.log(cs)
        await Contact.addThingbyGator(cs)
}
// 物品添加基本信息
const getAddThingDetail = async (cs) => {
    const Contact = await Conctract(thingAddress,ThingAbi);
    console.log(cs)
        await Contact.addThingbyGator(cs)
}
// 物品币更新
const upThingDetail = async (cs) => {
    const Contact = await Conctract(thingAddress,ThingAbi);
    console.log(cs)
        await Contact.updateThingbyGator(cs)
}
// 修改物品类型
const changeThing = async (cs) => {
    const Contact = await Conctract(thingAddress,ThingAbi);
    console.log(cs)
        await Contact.changeThingScopebyGator(cs)
}
// 物品删除
const delThing = async (cs) => {
    const Contact = await Conctract(thingAddress,ThingAbi);
        const param = [];
        param.push(cs)
    console.log(cs)
        await Contact.delMarketThingbyGator(param)
}
// 物品冻结
const lockThing = async (cs) => {
    const Contact = await Conctract(thingAddress,ThingAbi);
        const param = [];
        param.push(cs)
    console.log(cs)
        await Contact.lockThingbyGator(param)
}
// 物品解冻
const unlockThing = async (cs) => {
    const Contact = await Conctract(thingAddress,ThingAbi);
        const param = [];
        param.push(cs)
    console.log(cs)
        await Contact.unlockThingbyGator(param)
}




export default {
    lockGateby,
    unlockGateby,
    getGateList,
    getGateApplyList,
    addAdmin,
    delAdmin,
};
