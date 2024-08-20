import { CredentialResponse, GoogleCredentialResponse, GoogleLogin, GoogleOAuthProvider, TokenResponse } from "@react-oauth/google";

import axios from "../utils/CustomAxios";
import { getCookie, setCookie, setSessionCookie } from "../utils/Cookie";
import { useDispatch, useSelector } from "react-redux";
import memberSlice, { login } from "../features/memberSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { useState } from "react";
import { Cookies } from "react-cookie";


const GoogleLoginForm = ({onSignupRequest, handleClose}:{onSignupRequest:()=>void, handleClose:()=>void}) => { 
    
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;
    const dispatch = useDispatch();
   //유저정보 담는 store 생성
    const member = useSelector((state:RootState)=>state.member );
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    

    const googleOnSuccess =(data:CredentialResponse)=>{
        const Credential = data.credential;
       
        axios
            .post("http://localhost:8087/soundcast/auth/login/google",{
                Credential
            })
            .then(res => {
                console.log(Credential);
               if(!res.data.member){
                new Cookies().set("Credential", res.data.Credential, {maxAge: 60 * 1, path:'/'})
               
                onSignupRequest();
               }
               
               const JwtToken = res.data.jwtToken;
               console.log(JwtToken);
               setSessionCookie("accessToken",JwtToken);
               
               console.log(res.data.member);
               dispatch(login(res.data.member));


               handleClose();


            })
            .catch(error => {
                console.log(error);

            })

    }

    
    const googleOnFail = () =>{
       console.log("오류");
    }

   
     return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={googleOnSuccess}
                    onError={googleOnFail}
                />
            </GoogleOAuthProvider>
            
        </>
    );
};


export default GoogleLoginForm;