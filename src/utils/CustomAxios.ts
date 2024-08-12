import axios from "axios";
import { getCookie, removeCookie } from "./Cookie";


const CustomAxios = axios.create({

})

CustomAxios.interceptors.request.use(function(request){

    request.headers.Authorization="Bearer "+ getCookie('accessToken')
    console.log(getCookie('accessToken'));
    
    return request;
})

CustomAxios.interceptors.response.use(function(response){
    return response
},
    function(error){
        const{config, response:{status}} = error;

        if(status == 403){
            removeCookie('accessToken');
            removeCookie('user');
            window.location.href = '/'//로그인페이지 경로 작성
        }
{

}    }
)

export default CustomAxios;