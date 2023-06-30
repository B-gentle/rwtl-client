import { apiCalls } from "./apiCalls";

export const AddNewAdmin = async(payload) =>  apiCalls('post', `/api/admin/addadmin`, payload)

export const LoginAdmin = async(payload) =>  apiCalls('post', `/api/admin/login`, payload)

export const credituser = async(payload) =>  apiCalls('patch', `/api/admin/credit`, payload)

export const completeRegistration = async(payload) => apiCalls('patch', `/api/admin/completeRegistration`, payload)

export const ViewUser = async(payload) => apiCalls('post', `/api/admin/viewuser`, payload)

export const getLoggedinAdmin = async() =>  apiCalls('get', `/api/admin/getadmin`)

export const getLoggedinStatus = async() =>  apiCalls('get', `/api/admin/loginstatus`)

export const logoutAdmin = async() => apiCalls('get', '/api/admin/logout')

export const getPendingRegistrations = async() => apiCalls('get', '/api/admin/getpendingregistrations')
