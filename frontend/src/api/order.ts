import API from "./axiosInstance"


export const getUserOrder = async () => {
            const { data } = await API.get("/orders")
            console.log(data)
            return data

}