import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../features/memberSlice";
import { removeCookie } from "../utils/Cookie";
import { useNavigate } from "react-router-dom";

function Header() {

    const user = useSelector((state: RootState) => state.member);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const navi = useNavigate();
    
    useEffect(()=>{
        console.log("Current user state:",user);
        loginCloseHandler();
    },[user]);

    const loginHandler = () => {
        setShowModal(true);
    }

    const loginCloseHandler = () => {
        setShowModal(false);
    }

    const logoutHandler = () => {
        removeCookie("accessToken");
        navi("/");
        dispatch(logout());
    }

    const myPageHandler = () => {
        navi("/myPage");
    }

    const mainPageHandler = () => {
        navi("/");
    }


    return (
        <>
            <div className="Header">
                <div className="Logo" onClick={mainPageHandler} style={{cursor:"pointer"}}>
                    <img src="images\defaultLogo.png" />
                </div>
                <div className="DivideBox"></div>
                <div className="SiteMap">
                    <button>
                        <span>Sitemap</span>
                        <span>
                            <img src=".\images\default\Chevron_down.png" />
                        </span>
                    </button>
                </div>
                
                <div className="UserActions">
                    {user.email ? (
                        <>
                            <div className="Header-profile">
                                {user.profile && (
                                    <img
                                        src={user.profile}
                                        alt="User Profile"
                                        className="ProfileImage"
                                        onClick={myPageHandler}
                                        style={{cursor:"pointer"}}
                                    />
                                )}
                            </div>

                            <div className="Logout">
                                <button onClick={logoutHandler}>
                                    <span>
                                        <img src=".\images\default\logout.png" alt="Logout" />
                                    </span>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="Login">
                            <button onClick={loginHandler}>
                                <span>
                                    <img src=".\images\default\Login.png" alt="Login" />
                                </span>
                                <span>Login</span>
                            </button>
                        </div>
                    )}
                </div>
                {/* <div className="Login">
                    <button onClick={loginHandler}>
                        
                        <span>
                            <img src=".\images\default\Login.png"/>
                        </span>
                        <span>Login</span>
                    </button>
                </div>로그인 */}

                {/* <div className="Logout">
                    <button>
                        <span>
                            <img src=".\images\default\logout.png"/>
                        </span>
                        <span>Logout</span>
                    </button>
                </div>

                <div className="Header-profile">
                   
                    <img src=".\images\member\profile\profile_default.png"/>
                    
                    
                </div>
                 */}



                <Modal show={showModal} handleClose={loginCloseHandler} />




            </div>
        </>

    );
}
export default Header;