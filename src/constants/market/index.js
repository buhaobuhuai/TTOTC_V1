
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

// 门户审核
const applyGateby = async (cs) => {
    const Contact = await Conctract(gatorAddress,GatorAbis);
        // const param = [];
        // param.push(cs)
    console.log(cs)
        await Contact.applyGatebyMarketor(cs)
}
// 门户冻结
const lockGateby = async (cs) => {
    const Contact = await Conctract(gatorAddress,GatorAbis);
    
        const param = [];
        param.push(cs)
        
    // const param1 = ethers.decodeBytes32String(csz);
    // console.log(`编码结果： ${param1}`)
    console.log(param)
        await Contact.lockGatebyMarketor(param)
    // let addresss = "0x5ECF68A49d7F78547C6"
    // const param1 = ethers.encodeBytes32String("fasfsa");
    // console.log(`编码结果： ${param1}`)
}
// 门户解冻
const unlockGateby = async (cs) => {
    const Contact = await Conctract(gatorAddress,GatorAbis);
        const param = [];
        param.push(cs)
    // const param1 = ethers.decodeBytes32String(csz);
    // console.log(`编码结果： ${param1}`)
    console.log(cs)
        await Contact.unlockGatebyMarketor(param)
    // let addresss = "0x5ECF68A49d7F78547C6"
    // const param1 = ethers.encodeBytes32String("fasfsa");
    // console.log(`编码结果： ${param1}`)
}
// 门户列表
const getGateList = async (cs) => {
        const param = [];
        param.push(cs)
    console.log(cs)
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
// 门户申请列表
const getGateApplyList = async (cs) => {
        const param = [];
        param.push(cs)
    console.log(cs)
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
// 管理员列表
const getAdminList = async (cs) => {
        const param = [];
        param.push(cs)
    console.log(cs)
    ReadContact(marketorAddress,MarketorAbi).then(async (conctr)=>{
       return await conctr.marketorList.staticCallResult(param)
    }).then((result)=>{
        let name=['hy','qb','sl','jc','gj','ip','sj','scs','mhs','yhs']
        let data={}
        result.map((v,i)=>{
            data[name[i]]=v
        })
        return data
    })
}
// 新增管理员
const addAdmin = async (cs) => {
        const param = [];
        param.push(cs.name)
        param.push(cs.address)
    console.log(param)
    const Contact = await Conctract(marketorAddress,MarketorAbi);
        await Contact.setMarketorByMarketCreator(param)
}
// 删除管理员
const delAdmin = async (cs) => {
        const param = [];
        param.push(cs)
    const Contact = await Conctract(marketorAddress,MarketorAbi)
    console.log(cs)
        await Contact.delMarketorByMarketCreator(param)
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
        await Contact.addCoinbyMarketor(cs)
}
// 虚拟币添加基本信息
const getAddCionDetail = async (cs) => {
    const Contact = await Conctract(coinAddress,CoinAbi);
    console.log(cs)
        await Contact.addCoinbyMarketor(cs)
}
// 虚拟币更新
const upCionDetail = async (cs) => {
    const Contact = await Conctract(coinAddress,CoinAbi);
    console.log(cs)
        await Contact.updateCoinbyMarketor(cs)
}
// 修改币种类型
const changeCoin = async (cs) => {
    const Contact = await Conctract(coinAddress,CoinAbi);
    console.log(cs)
        await Contact.changeCoinScopebyMarketor(cs)
}
// 虚拟币删除
const delCion = async (cs) => {
    const Contact = await Conctract(coinAddress,CoinAbi);
        const param = [];
        param.push(cs)
    console.log(cs)
        await Contact.delCoinbyMarketor(param)
}
// 虚拟币拉黑
const CionBlock = async (cs) => {
    const Contact = await Conctract(coinAddress,CoinAbi);
        const param = [];
        param.push(cs)
    console.log(cs)
        await Contact.delCoinbyMarketor(param)
}
// 虚拟币冻结
const lockCion = async (cs) => {
    const Contact = await Conctract(coinAddress,CoinAbi);
        const param = [];
        param.push(cs)
    console.log(cs)
        await Contact.lockCoinbyMarketor(param)
}
// 虚拟币解冻
const unlockCion = async (cs) => {
    const Contact = await Conctract(coinAddress,CoinAbi);
        const param = [];
        param.push(cs)
    console.log(cs)
        await Contact.unlockCoinbyMarketor(param)
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
        await Contact.addThingbyMarketor(cs)
}
// 物品添加基本信息
const getAddThingDetail = async (cs) => {
    const Contact = await Conctract(thingAddress,ThingAbi);
    console.log(cs)
        await Contact.addThingbyMarketor(cs)
}
// 物品币更新
const upThingDetail = async (cs) => {
    const Contact = await Conctract(thingAddress,ThingAbi);
    console.log(cs)
        await Contact.updateThingbyMarketor(cs)
}
// 修改物品类型
const changeThing = async (cs) => {
    const Contact = await Conctract(thingAddress,ThingAbi);
    console.log(cs)
        await Contact.changeThingScopebyMarketor(cs)
}
// 物品删除
const delThing = async (cs) => {
    const Contact = await Conctract(thingAddress,ThingAbi);
        const param = [];
        param.push(cs)
    console.log(cs)
        await Contact.delMarketThingbyMarketor(param)
}
// 物品拉黑
const CionThing = async (cs) => {
    const Contact = await Conctract(thingAddress,ThingAbi);
        const param = [];
        param.push(cs)
    console.log(cs)
        await Contact.delGateThingbyMarketor(param)
}
// 物品冻结
const lockThing = async (cs) => {
    const Contact = await Conctract(thingAddress,ThingAbi);
        const param = [];
        param.push(cs)
    console.log(cs)
        await Contact.lockThingbyMarketor(param)
}
// 物品解冻
const unlockThing = async (cs) => {
    const Contact = await Conctract(thingAddress,ThingAbi);
        const param = [];
        param.push(cs)
    console.log(cs)
        await Contact.unlockThingbyMarketor(param)
}




export default {
    lockGateby,
    unlockGateby,
    getGateList,
    getGateApplyList,
    addAdmin,
    delAdmin,
};
