import { MouseEvent} from 'react';
import '../pages/css/Modal.css';
import GoogleLoginForm from './GoogleLoginForm';
import KakaoLoginForm from './KakaoLoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { login } from '../features/memberSlice';
import { Member } from '../type/memberType';

const Modal = ({show, handleClose}:{show:boolean, handleClose:() => void}) => {

    //const [user, setUserState] = useState<any>(null); // 사용자 정보를 저장할 상태

    const dispatch = useDispatch();

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    const handleBackgroundClick = (event:MouseEvent) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    };

    function setUser(data: Member): void {
        console.log('User data:', data);
        //setUserState(data); // 사용자 정보를 상태에 저장
        dispatch(login(data));
        handleClose();
    }

    return (
        <div className={showHideClassName} onClick={handleBackgroundClick}>
            <div className="modal-main">
                <button className="close-button" onClick={handleClose}>X</button>
                <div className='modal-serve'>
                    <img src="/사운드케스트 로고.png" alt="Soundcast Logo" className="logo" />
                        <h2 className='h2' style={{ color: 'black' }}>로그인</h2>
                        <p style={{ color: '#BBBBBB' }}>지금 바로 서비스를 이용해 보세요!</p>
                        <div className="login-buttons">
                            <KakaoLoginForm/>
                            <button className="login-btn naver">네이버로 로그인</button>
                            <GoogleLoginForm/>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
