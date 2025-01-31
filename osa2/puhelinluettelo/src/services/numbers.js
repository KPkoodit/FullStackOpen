import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getAllNumbers = () => {
    return axios.get(baseUrl)
}

const createNumber = newNumber => {
    return axios.post(baseUrl, newNumber)
}

const updateNumber = (id, newNumber) => {
    return axios.put(`${baseUrl}/${id}`, newNumber)
}

const deleteNumber = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {
    getAllNumbers: getAllNumbers,
    createNumber: createNumber,
    updateNumber: updateNumber,
    deleteNumber: deleteNumber
}