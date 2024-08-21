import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import axios from "axios";

const GoogleLoginForm = () => { 
    const clientId = 'clientID'
    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={(res) => {
                        console.log(res);
                    }}
                    onError={() => {
                        console.log("오류");
                    }}
                />
            </GoogleOAuthProvider>
        </>
    );

};

export default GoogleLoginForm;