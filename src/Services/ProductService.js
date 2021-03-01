import {productList,Categories} from "../conastant";

export async function getProductsByType(type){

    let list = filterProductsByType(type);
    // const endpoint = ''
    // let api = await API();
    // return api.get(endpoint);
    return list;
}


export async function  getProductImageById(id){
    // const endpoint = ''
    // let api = await API();
    // return api.get(endpoint);
    return true;
}

export  async function  getCategoriesByProductType(type){

    let list = [];
    for(let i=0;i<Categories.length;i++){
        if(Categories[i].productType==type){
            list = Categories[i].categories;
        }
    }

    // const endpoint = ''
    // let api = await API();
    // return api.get(endpoint);
    return list;
}

export async function submitProductDetials(product){
    // const endpoint = ''
    // let api = await API();
    // return api.get(endpoint,product);
    return true;
}


function filterProductsByType(type) {
    var selectedList = [];
    for(var i=0;i<productList.length;i++){
        if(productList[i].productType===type){
            selectedList.push(productList[i]);
        }
    }
    return selectedList;
}