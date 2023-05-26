import axios from 'axios'

export const apiCalls = async (method, url, payload) =>{
try {
    const response = await axios({method, url, data: payload})
    return response
} catch (error) {
    return error
}
}
