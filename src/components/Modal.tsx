import { MouseEvent, useState } from 'react';
import '../pages/css/Modal.css';
import GoogleLoginForm from './GoogleLoginForm';
import { User } from '../type/user';

const Modal = ({show, handleClose}:{show:boolean, handleClose:() => void}) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    const handleBackgroundClick = (event:MouseEvent) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    };
    const [user, setUser] = useState<User | null>(null);
    return (
        <div className={showHideClassName} onClick={handleBackgroundClick}>
            <div className="modal-main">
                <button className="close-button" onClick={handleClose}>X</button>
                <div className='modal-serve'>
                    <img src=".\images\default\LoginLogo.png" alt="Soundcast Logo" className="logo" />
                        <h2 className='h2' style={{ color: 'black' }}>로그인</h2>
                        <p style={{ color: '#BBBBBB' }}>지금 바로 서비스를 이용해 보세요!</p>
                        <div className="login-buttons">
                            <button className="login-btn kakao">카카오로 로그인</button>
                            <button className="login-btn naver">네이버로 로그인</button>
                            <GoogleLoginForm setUser={setUser}/>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
