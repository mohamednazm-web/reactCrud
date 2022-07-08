import { API } from "./config"

// START USER
export const getOneUser = id => API.get(`/api/v1/user/${id}`)
export const getAllUsers = () => API.get("/api/v1/user")
export const createUser = newUser => API.post("/api/v1/user", newUser)
export const deleteUser = id => API.delete(`/api/v1/user/${id}`)
export const updateUser = (id, newUser) =>
  API.put(`/api/v1/user/${id}`, newUser)
// END USER

// START USER ADDRESS
export const getOneUserAddress = id => API.get(`/api/v1/user-address/${id}`)
export const getAllUserAddress = () => API.get("/api/v1/user-address")
export const createUserAddress = newUserAddress =>
  API.post("/api/v1/user-address", newUserAddress)
export const deleteUserAddress = id => API.delete(`/api/v1/user-address/${id}`)
export const updateUserAddress = (id, newUser) =>
  API.put(`/api/v1/user-address/${id}`, newUser)
// END USER ADDRESS

// MESSAGE //
export const createMessage = message => API.post("/api/v1/message", message)

// START STOCK ENTRY //
export const getAllStockEntry = () => API.get("/stockEntry")
export const createStockEntry = newStockEntry =>
  API.post("/stockEntry", newStockEntry)
