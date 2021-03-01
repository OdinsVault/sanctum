import {newOrders,reviewedOrders,completedOrders} from '../conastant'


export async function getNewOrderList(){

	const endpoint = ''
	// let api = await API();
	// return api.get(endpoint);
	return newOrders;
}

export async function setOrderAsReviewed(order){
	
	const endpoint = ''
	// 	let params ={
	// 	order : order,
	// 	userId : getuserId
	// }
	// let api = await API();
	// return api.get(endpoint,params);
	return true;
}

export async function getReviewedOrderList(){

	const endpoint = ''
	// let api = await API();
	// return api.get(endpoint);
	return reviewedOrders;
}

export async function cancelOrder(order){

	const endpoint = '/'
	// 	let params ={
	// 	order : order.id,
	// 	userId : getUserId()
	// }
	// let api = await API();
	// return api.get(endpoint,params);
	return true;
}

export async function getCompletedOrders(){

	const endpoint = ''
	// let api = await API();
	// return api.get(endpoint);
	return completedOrders;
}

export async function completeOrder(order){

	const endpoint = ''
	// let params ={
	// 	order : order,
	// 	userId : getuserId
	// }
	// let api = await API();
	// return api.get(endpoint,params);
	return true;	
}