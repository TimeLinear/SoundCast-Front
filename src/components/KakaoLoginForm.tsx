import KakaoLogin from "react-kakao-login";
import { LoginResponse } from "../type/user";
import axios from "../utils/CustomAxios";
import { setCookie, setSessionCookie } from "../utils/Cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { login } from "../features/memberSlice";
import { Member } from "../type/memberType";

interface KakaoLoginFormProps{
    setUser : (data:any) => void;
}

export default function KakaoLoginForm({onSignupRequest, handleClose}:{onSignupRequest:()=>void, handleClose:()=>void}){
    const kakaoJavascriptKey = process.env.REACT_APP_KAKAO_API_KEY as string;

    const user = useSelector((state:RootState) => state.member);
    const dispatch = useDispatch();
    
    const kakaoOnSucess = (data:{response:LoginResponse}) => {
        console.log('카카오전달 데이터',data)

        const ACCESS_TOKEN = data.response.access_token;

        // axios.get("https://kapi.kakao.com/v2/user/me" , {
        //     headers : {Authorization : `Bearer ${ACCESS_TOKEN}`}
        // }).then((res)=>{
        //     console.log(res);
        //     const {properties} = res.data
        //     const user = {
        //         nickName : properties.nickname,
        //         profile : properties.profile_image
        //     }
        //     setUser(user);
        // })
        axios 
            .post("http://localhost:8087/soundcast/auth/login/kakao",{
                accessToken:ACCESS_TOKEN
            })
            .then(res => {
                console.log("-------------------------")
                console.log(ACCESS_TOKEN);
                console.log(res);
                const JwtToken = res.data.jwtToken;
                setSessionCookie("accessToken", JwtToken); // 필수 사항
               //선택사항 setCookie("user",JSON.stringify(res.data.user));
                // const loginMember:Member = {
                //     memberNo:res.data.member.memberNo,
                //     profile:res.data.member.profileImage.profileImagePath,
                //     nickName:res.data.member.memberNickname,
                //     email:res.data.member.memberEmail,
                //     banner:res.data.member.memberBanner.memberBannerPath,
                //     introduce:res.data.member.memberIntroduce,
                //     follow:res.data.member.follwer
                // }
                dispatch(login(res.data.member)); // 필수 사항
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            })


    }

    const kakaoOnFail =(error:any)=>{
        console.log(error);
    }

    return(
        <KakaoLogin 
            token={kakaoJavascriptKey}
            onSuccess={kakaoOnSucess}
            onFail={kakaoOnFail}
        />
    )
}