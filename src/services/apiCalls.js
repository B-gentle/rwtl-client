import axios from 'axios'
import { getPackages, getPackagesForUpgrade } from './packageCall'

export const apiCalls = async (method, url, payload) => {
    try {
        const response = await axios({
            method,
            url,
            data: payload
        })
        return response
    } catch (error) {
        return error
    }
}

export const packagesCall = async(set, antDmessage) => {
    try {
        const response = await getPackages()
        set(response.data.data)
        if (response.status !== 200) {
          const message =
            (response.response && response.response.data && response.response.data.message) ||
            response.message ||
            response.toString();
          throw new Error(message)
        }
      } catch (error) {
        antDmessage.error(error.message)
      }
}

export const packagesUpgradeCall = async(set, antDmessage) => {
  try {
      const response = await getPackagesForUpgrade()
      set(response.data.data)
      if (response.status !== 200) {
        const message =
          (response.response && response.response.data && response.response.data.message) ||
          response.message ||
          response.toString();
        throw new Error(message)
      }
    } catch (error) {
      antDmessage.error(error.message)
    }
}