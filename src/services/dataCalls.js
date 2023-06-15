import { apiCalls } from "./apiCalls";


export const getData = async () => apiCalls('get', `/api/data/plans`);