import { useState } from "react";
import { Member } from "../type/memberType";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../features/memberSlice";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";



function Header() {
    const member = useSelector((state:RootState)=>state.member );
    const dispatch = useDispatch();
    const [showModal, setShowModal]=useState(false);
    // const navi = useNavigate();



    //회원 로그인창 핸들러
    const loginHandler = () =>{
        setShowModal(true);
    }

    const loginCloseHandler = () =>{
        setShowModal(false);
    }
    
    const logoutHandler = ()=>{
        dispatch(logout());
       
    }

    // const myPageHandler = () => {
    //     navi("/myPage");
    // }

    //회원가입 모달창
    const [showSignUp, setShowSignUp] = useState(false);
    const openSignUp = () => setShowSignUp(true);
    const closeSignUp = () => setShowSignUp(false);


    return(
        <>
            <div className="Header">
                <div className="Logo">
                    <img src=".\images\default\defaultLogo.png"/>
                </div>
                <div className="DivideBox"></div>
                <div className="SiteMap">
                    <button>
                        <span>Sitemap</span>
                        <span>
                            <img src=".\images\default\Chevron_down.png"/>
                        </span>
                    </button>

                </div>
                {member.nickName === "" ? (
                    <div className="Login">
                        <button onClick={loginHandler}>
                            
                            <span>
                                <img src=".\images\default\Login.png"/>
                            </span>
                            <span>Login</span>
                        </button>
                    </div>
                    

                 ):(
                    <>
                 <div className="Header-profile">
                                {member.profile && (
                                    <img
                                        src={member.profile}
                                        alt="User Profile"
                                        className="ProfileImage"
                                        // onClick={myPageHandler}
                                        style={{cursor:"pointer"}}
                                    />
                                )}
                            </div>




                 <div className="Logout">
                    <button onClick={logoutHandler}>
                        <span>
                            <img src=".\images\default\logout.png"/>
                        </span>
                        <span>Logout</span>
                    </button >
                </div>

                
                 </>
                )}



      <LoginModal show={showModal} handleClose={loginCloseHandler} onSignupRequest={openSignUp}  />
      
      <SignUpModal showSignUp={showSignUp} openSignUp={openSignUp} closeSignUp={closeSignUp} /> 
            </div>
        </>

    );
}
export default Header;