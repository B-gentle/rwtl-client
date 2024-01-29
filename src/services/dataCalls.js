import { apiCalls } from "./apiCalls";


export const getDataPlans = async (payload) => apiCalls('post', `/api/data/dataplans`, payload);

export const getCable = async (payload) => apiCalls('post', '/api/data/cablePlans', payload)

export const getJoeNatechMtnPlans = async () => apiCalls('get', '/api/data/getjoenadmtnplan' )