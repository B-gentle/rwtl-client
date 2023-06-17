import { apiCalls } from "./apiCalls";


export const getData = async (payload) => apiCalls('post', `/api/data/plans`, payload);