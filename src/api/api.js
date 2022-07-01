const SERVER_URL = 'https://www.coinfortal.com:8080'

const getApi = async url => {
    return await fetch(`${SERVER_URL}/${url}`, { headers: { jwt: localStorage.getItem('user') } }).then(res => res.json())
}

const postApi = async (url, data, header) => {
    return await fetch(`${SERVER_URL}/${url}`, {
        headers: { jwt: localStorage.getItem('user'),'Content-Type': "application/json;charset=UTF-8",...header },
        method:'post',
        body:JSON.stringify(data)
    }).then(res => res.json())
}

const putApi = async (url, header) => {
    return await fetch(`${SERVER_URL}/${url}`, {
        headers: { jwt: localStorage.getItem('user'),'Content-Type': "application/json;charset=UTF-8",...header },
        method:'put',
    }).then(res => res.json())
}

const api = {
    get: getApi,
    post: postApi,
    put: putApi,
}

export default api