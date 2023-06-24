import { apiCalls } from "./apiCalls";

export const PurchaseAirtime = async (payload) => apiCalls('post', `/api/transaction/purchaseairtime`, payload)

export const PurchaseData = async (payload) => apiCalls('post', `/api/transaction/purchasedata`, payload)

export const PayCable = async (payload) => apiCalls('post', '/api/transaction/subscribedish')

export const sendMoney = async (payload) => apiCalls('patch', `/api/transaction/sendmoney`, payload)

export const TransferComm = async (payload) => apiCalls('post', `/api/transaction/transfercomm`, payload)

export const buyAirtime = async (payload) => apiCalls('post', `/api/transaction/purchaseairtime`, payload)

export const getTransactions = async () => apiCalls('get', `/api/transaction/get-transactions`)

export const transformTransaction = (transaction) => {
    const { network, transactionType } = transaction;

    let transformedNetwork = "";
    switch (network) {
        case "01":
            transformedNetwork = "MTN";
            break;
        case "02":
            transformedNetwork = "Glo";
            break;
        case "04":
            transformedNetwork = "AIRTEL";
            break;
        case "03":
            transformedNetwork = "9 Mobile";
            break;
        default:
            transformedNetwork = "";
            break;
    }

    let transformedTransactionType = "";
    switch (transactionType) {
        case "fundTransfer":
            transformedTransactionType = "Wallet to Wallet Transfer";
            break;
        default:
            transformedTransactionType = transactionType;
            break;
    }

    return {
        ...transaction,
        network: transformedNetwork,
        transactionType: transformedTransactionType
    };
};




