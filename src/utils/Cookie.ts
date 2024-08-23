import { Cookies } from "react-cookie";

const cookies =new Cookies();

export const setCookie = (name: string, value: string) =>{
    return cookies.set(name, value, {maxAge: 60 * 60 * 3, path:'/'}) //이름 값 유효시간 경로

}

export const setSessionCookie =  (name: string, value: string) =>{
    return cookies.set(name, value, { path:'/'})
}


export const getCookie = (name: string) =>{
    return cookies.get(name);
}

export const removeCookie = (name: string) =>{
    return cookies.set(name,"",{maxAge:0,path:'/'}) //유효시간 0으로만들어서 쿠키삭제
}