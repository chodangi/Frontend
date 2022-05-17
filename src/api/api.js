const SERVER_URL = 'http://13.209.180.179:8080'

const getApi = async url => {
    return await fetch(`${SERVER_URL}/${url}`, { headers: { jwt: localStorage.getItem('user') } }).then(res => res.json())
}
const postApi = async (url, data, header) => {
    return await fetch(`${SERVER_URL}/${url}`, {
        headers: { jwt: localStorage.getItem('user'),...header },
        method:'post',
        body:JSON.stringify(data)
    }).then(res => res.json())
}

const api = {
    get: getApi,
    post: postApi
}

export default api