import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newNumber => {
    return axios.post(baseUrl, newNumber)
}

const update = (id, newNumber) => {
    return axios.put(`${baseUrl}/${id}`, newNumber)
}

const deleteNumber = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {
    getAll: getAll,
    create: create,
    update: update,
    deleteNumber: deleteNumber
}