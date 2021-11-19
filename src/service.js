import 'axios'
import axios from "axios";

const getSku = async (substr) => {
    const response = await axios.get(`http://localhost:8081/skus/?search=${substr}`)
    let data = response.data
    return data
}
const getDoc = async (docId) => {
    const response = await axios.get(`http://localhost:8081/get-docs/${docId}`)
    return response.data
}
const takePay = async (doc) => {
    const response = await axios.post(`http://localhost:8081/pay/`,doc)
    return response.data
}
const download = async (ids) => {
    const response = await axios.post(`http://localhost:8081/download/`, ids)
    return response.data
}
const getShiftState = async () => {
    try {
        const response = await axios.get("http://localhost:8081/shift-state/")
        return response.data
    } catch (e) {
        return {errors: ["Ошибка сервера при использовании shift-state/"]}
    }


}
const openShift = async () => {
    const response = await axios.get("http://localhost:8081/shift-open/")
    return response.data
}
const closeShift = async () => {
    const response = await axios.get("http://localhost:8081/shift-close/")
    return response.data
}
export {download, getSku, getDoc, getShiftState, openShift, closeShift, takePay}
