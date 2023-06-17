import { apiCalls } from "./apiCalls";

export const PurchaseAirtime = async(payload) =>  apiCalls('post', `/api/transaction/purchaseairtime`, payload)

export const PurchaseData = async(payload) =>  apiCalls('post', `/api/transaction/purchasedata`, payload)

export const sendMoney = async(payload) =>  apiCalls('patch', `/api/transaction/sendmoney`, payload)

export const buyAirtime = async(payload) =>  apiCalls('post', `/api/transaction/purchaseairtime`, payload)

export const getTransactions = async() =>  apiCalls('get', `/api/transaction/getTransactions`)


