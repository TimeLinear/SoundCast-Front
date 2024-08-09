import { CredentialResponse, GoogleCredentialResponse, GoogleLogin, GoogleOAuthProvider, TokenResponse } from "@react-oauth/google";

import axios from "axios";
import { setCookie } from "../utils/Cookie";


const GoogleLoginForm = ({setUser}:{setUser:(data:any)=>void}) => { 
    
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;
    const clientSecret = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET as string;
    const redirect_url = process.env.REACT_APP_GOOGLE_REDIRECT_URL as string;
   
    // const url = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=' +
    //         clientId +
    //         '&redirect_uri=' +
    //         redirect_url +
    //         '&response_type=code' +
    //         '&scope=email profile';
      
    
     
    // const getUserData = useGoogleLogin({
    //     onSuccess:(tokenResponse) =>{
    //         const ACCESS_TOKEN = tokenResponse.access_token;
    //     }
    // })
    //console.log('google token', getUserData);

    const token = (data:TokenResponse)=>{
       return data.access_token;
    }

    


    const googleOnSuccess =(data:CredentialResponse)=>{
        const Credential = data.credential;

        axios
            .post("http://localhost:8087/soundcast/login/google",{
                Credential
            })
            .then(res => {
                console.log(res);
                const JwtToken = res.data.jwtToken;
                setCookie("accessToken",JwtToken);
            })
            .catch(error => {
                console.log(error);
            })
    }

    // const googleOnSuccess = (data: GoogleCredentialResponse) => {
    //     const credential = data.credential; // Google에서 받은 자격증명
    
    //     // 서버에 POST 요청을 보내서 JWT 토큰을 받아옵니다.
    //     axios.post("http://localhost:8087/soundcast/login/google", 
    //         { credential },
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         }
    //     )
    //     .then(res => {
    //         // JWT 토큰을 성공적으로 받아오면
    //         const token = res.data.access_token; // 서버에서 받은 토큰
    //         console.log('JWT Token:', token);
    
    //         // 이후에 다른 요청에서 이 토큰을 사용할 수 있습니다.
    //         // 예를 들어, 다음 요청에 토큰을 포함시키기
    //         axios.get("http://localhost:8087/soundcast/google", {
    //             headers: {
    //                 'Authorization': `Bearer ${token}` // JWT 토큰 포함
    //             }
    //         })
    //         .then(response => {
    //             console.log('Protected data:', response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching protected data:', error);
    //         });
    //     })
    //     .catch(err => {
    //         console.error('Error during login:', err);
    //     });
    // };

















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