import { apiCalls } from "./apiCalls";

export const AddNewAdmin = async(payload) =>  apiCalls('post', `/api/admin/addadmin`, payload)

export const LoginAdmin = async(payload) =>  apiCalls('post', `/api/admin/login`, payload)

export const credituser = async(payload) =>  apiCalls('patch', `/api/admin/credit`, payload)

export const changePassword = async(payload) => apiCalls('patch', '/api/admin/changepassword', payload)

export const completeRegistration = async(payload) => apiCalls('patch', `/api/admin/completeRegistration`, payload)

export const ViewUser = async(payload) => apiCalls('post', `/api/admin/viewuser`, payload)

export const EditUserPI = async(payload) => apiCalls('post', `/api/admin/edituserpi`, payload)

export const EditUserUsername = async(payload) => apiCalls('post', `/api/admin/edit-user-username`, payload)

export const EditUserBank = async(payload) => apiCalls('post', `/api/admin/edituserbank`, payload)

export const EditUserPassword = async(payload) => apiCalls('post', `/api/admin/edituserpassword`, payload)

export const EnterUserAccount = async(payload) => apiCalls('post', `/api/admin/enteruseraccount`, payload)

export const ViewUserTransactions = async(payload) => apiCalls('post', `/api/admin/viewusertransactions`, payload)

export const DeleteUser = async(payload) => apiCalls('post', `/api/users/deleteuser`, payload)

export const getFullName = async(payload) => apiCalls('post', '/api/admin/get-full-name', payload)

export const Message = async(payload) => apiCalls('post', '/api/admin/notifyusers', payload)

export const getLoggedinAdmin = async() =>  apiCalls('get', `/api/admin/getadmin`)

export const getLoggedinStatus = async() =>  apiCalls('get', `/api/admin/loginstatus`)

export const logoutAdmin = async() => apiCalls('get', '/api/admin/logout')

export const getPendingRegistrations = async() => apiCalls('get', '/api/admin/getpendingregistrations')

export const GetQualifiedUsers = async() => apiCalls('get', '/api/admin/view-qualified-users')
