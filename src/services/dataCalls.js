import { apiCalls } from "./apiCalls";


export const getData = async (payload) => apiCalls('get', `https://www.nellobytesystems.com/APIDatabundlePlansV2.asp`, payload);

export const getCable = async (payload) => apiCalls('post', '/api/data/cablePlans', payload)