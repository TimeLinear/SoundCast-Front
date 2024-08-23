import { MouseEvent, useEffect, useState } from 'react';
import '../pages/css/Modal.css';
import GoogleLoginForm from './GoogleLoginForm';

import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import KakaoLoginForm from './KakaoLoginForm';

const LoginModal = ({show, handleClose, onSignupRequest}:{show:boolean, handleClose:() => void, onSignupRequest:()=>void} ) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const member = useSelector((state:RootState) => state.member);
   //member객체 추적해서 이벤트변경해주는함수 useEffect 
    useEffect(() => {
        handleClose();
    }, [member]) 



    const handleBackgroundClick = (event:MouseEvent) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    };


    const handleSignupRequest = () => {
        onSignupRequest();
        handleClose();
    }

    return (
        <div className={showHideClassName} onClick={handleBackgroundClick}>
            <div className="modal-main">
                <button className="close-button" onClick={handleClose}>X</button>
                <div className='modal-serve'>
                    <img src=".\images\default\LoginLogo.png" alt="Soundcast Logo" className="logo" />
                        <h2 className='h2' style={{ color: 'black' }}>로그인</h2>
                        <p style={{ color: '#BBBBBB' }}>지금 바로 서비스를 이용해 보세요!</p>
                        <div className="login-buttons">
                            <GoogleLoginForm onSignupRequest={handleSignupRequest} handleClose={handleClose} />
                            <button className="login-btn naver">네이버로 로그인</button>
                            <KakaoLoginForm onSignupRequest={handleSignupRequest} handleClose={handleClose}/>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
