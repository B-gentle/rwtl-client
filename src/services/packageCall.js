import { apiCalls } from "./apiCalls";


export const getPackages = async () => apiCalls('get', `/api/packages/packages`)