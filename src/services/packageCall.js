import { apiCalls } from "./apiCalls";


export const getPackages = async () => apiCalls('get', `/api/packages/packages`)

export const getPackagesForUpgrade = async () => apiCalls('get',`/api/packages/upgradepackages`)