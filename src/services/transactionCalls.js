import { apiCalls } from "./apiCalls";

export const PurchaseAirtime = async(payload) =>  apiCalls('post', `/api/transaction/purchaseairtime`, payload)

export const sendMoney = async(payload) =>  apiCalls('patch', `/api/transaction/sendmoney`, payload)


