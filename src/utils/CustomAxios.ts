import axios from "axios";
import { getCookie, removeCookie } from "./Cookie";


const CustomAxios = axios.create({

})

CustomAxios.interceptors.request.use(function(request){
    
    request.headers.Authorization="Bearer "+ getCookie("accessToken")
 
    return request;
})

CustomAxios.interceptors.response.use(function(response){
    return response
},
    function(error){
<<<<<<< HEAD
        const{response:{status}} = error;

        if(Number(status) === 403){
=======
        const{config, response:{status}} = error;

        if(status == 403){
>>>>>>> origin/myPage_sds
            console.log("403 error");
            removeCookie('accessToken');
            removeCookie('member');
            window.location.href = 'http://localhost:3000/'//로그인페이지 경로 작성
        }
{

}    }
)

export default CustomAxios;