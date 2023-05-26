import { apiCalls } from "./apiCalls";
const URL = process.env.REACT_APP_SERVER_URL

export const getPackages = async () => apiCalls('get', `${URL}/api/packages/packages`)