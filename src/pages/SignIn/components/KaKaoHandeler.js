import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// `13.209.180.179:8080/oauth/login?token=${searchParams.get('code')}`
const KaKaoHandler = () => {
    const REST_API_KEY = "bbac0c1542268d22cd795e3d398071f5";
    const CLIENT_SECRET = "JG5vGorIX2Bga6hS7UlXTMtV45Z7ZG8g";
    const REDIRECT_URI = "https://www.coinfortal.com/kakao";
    const nav = useNavigate()

    const [jwt, setJWT] = useState('')

    useEffect(() => {
        const { searchParams } = new URL(document.location.toString())
        console.log(searchParams)

        const toUnlencoded = obj => Object.keys(obj).reduce((res, key) => {
            return `${res}&${key}=${obj[key]}`
        }, '').substring(1)

        const options = {
            grant_type: 'authorization_code',
            client_id: REST_API_KEY,
            code: searchParams.get('code'),
            redirect_uri: REDIRECT_URI
        }

        // fetch('https://kauth.kakao.com/oauth/token', {
        //     method: "POST",
        //     headers: {
        //         'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        //     },
        //     body: toUnlencoded(options)
        // }).then(res => {
        //     console.log(res)
        // }).catch(e => console.log(e))


        // fetch(`13.209.180.179:8080/oauth/login?token=${searchParams.get('code')}`).then(res=>res)



        axios.post(`https://kauth.kakao.com/oauth/token`, toUnlencoded(options)
            , {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                const { data: { access_token } } = res;
                fetch(`http://www.coinfortal.com:8080/oauth/login?token=${access_token}`).then(res => res.json()).then(res => {
                    const { data: { jwt } } = res
                    setJWT(jwt)
                    console.log(jwt)
                    localStorage.setItem('user',jwt)
                    nav('/')
                }
                )
            })
    }, []);


    return <></>
}

export default KaKaoHandler;