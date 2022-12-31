import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getRecords = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newRecord => {
    const request = axios.post(baseUrl, newRecord)
    return request.then(response => response.data)
}

const update = (id, updatedRecord) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedRecord)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default {getRecords, create, update, remove}

