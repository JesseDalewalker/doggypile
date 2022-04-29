import axios from "axios"
import apiHelpers from "./ApiHelpers"

const DoggyPileAPI = {}
const BASE_URL = "http://localhost:8000"

// Get items
DoggyPileAPI.getAllItems = async (item) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/${item}/`, apiHelpers.getCsrfConfig)
  )
}

// Get item by id
DoggyPileAPI.getItemById = async (item, itemId) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/${item}/${itemId}/`, apiHelpers.getCsrfConfig())
  )
}

// Create items
DoggyPileAPI.createItems = async (item, itemData) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.post(`${BASE_URL}/${item}/`, itemData, apiHelpers.getCsrfConfig())
  )
}

// Edit items
DoggyPileAPI.editItems = async (item, itemId, itemData) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.patch(`${BASE_URL}/${item}/${itemId}/`, itemData, apiHelpers.getCsrfConfig())
  )
}

// Delete item
DoggyPileAPI.deleteItem = async (item, itemId) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.delete(`${BASE_URL}/${item}/${itemId}/`, apiHelpers.getCsrfConfig())
  )
}

export default DoggyPileAPI