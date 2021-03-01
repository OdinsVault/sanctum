import {outOfStockList, lowStockList,Stocks} from "../conastant";

export async function getLowStockList(){

    const endpoint = ''
    // let api = await API();
    // return api.get(endpoint);
    return lowStockList;
}

export async function getOutOfStockList(){

    const endpoint = ''
    // let api = await API();
    // return api.get(endpoint);
    return outOfStockList;
}

export async  function  getStocksByType(type){
    return Stocks
}
