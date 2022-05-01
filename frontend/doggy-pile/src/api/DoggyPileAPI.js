import axios from "axios"
import apiHelpers from "./ApiHelpers"

const DoggyPileAPI = {}
const BASE_URL = "http://localhost:8000"

// When making API calls, don't forget the parameters!
// item refers to the model names (users, user-profile...)

// Authentication methods
DoggyPileAPI.signup = async (signupData) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.post(`${BASE_URL}/doggy-pile/users/`, signupData, apiHelpers.getCsrfConfig())
  )
}

DoggyPileAPI.login = async (loginData) => {
  console.log(loginData)
  return await apiHelpers.tryCatchFetch(
    () => axios.post(`${BASE_URL}/doggy-pile/login/`, loginData, apiHelpers.getCsrfConfig())
  )
}

DoggyPileAPI.logout = async () => {
  return await apiHelpers.tryCatchFetch(
    () => axios.post(`${BASE_URL}/doggy-pile/logout/`, null, apiHelpers.getCsrfConfig())
  )
}

// Get items
DoggyPileAPI.getAllItems = async (item) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/doggy-pile/${item}/`, apiHelpers.getCsrfConfig)
  )
}

// Get item by id
DoggyPileAPI.getItemById = async (item, itemId) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/doggy-pile/${item}/${itemId}/`, apiHelpers.getCsrfConfig())
  )
}

// Create items
DoggyPileAPI.createItems = async (item, itemData) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.post(`${BASE_URL}/doggy-pile/${item}/`, itemData, apiHelpers.getCsrfConfig())
  )
}

// Edit items
DoggyPileAPI.editItems = async (item, itemId, itemData) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.patch(`${BASE_URL}/doggy-pile/${item}/${itemId}/`, itemData, apiHelpers.getCsrfConfig())
  )
}

// Delete item
DoggyPileAPI.deleteItem = async (item, itemId) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.delete(`${BASE_URL}/doggy-pile/${item}/${itemId}/`, apiHelpers.getCsrfConfig())
  )
}

export default DoggyPileAPI