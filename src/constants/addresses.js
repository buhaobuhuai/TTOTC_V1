import {ethers} from 'ethers'

export const gatorAddress = '0x27B4d7D780bb21c66f903606cbF31C2A1315feD2';
export const marketorAddress = '0xFC57F91Cba92198ab9a3063b5b9dF6eFe529B254';
export const coinAddress = '0x0797AF617643c702C06D3f58bC4698ACdea72fB2';
export const thingAddress = '0x006fa751cB3bdA1318E60D61c2eb5B5655903A32';

export const userAddress = sessionStorage.getItem("userKey");

const { ethereum } = window;

// 测试
// export const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
// 主网
export const provider= new ethers.BrowserProvider(ethereum);