import { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "../utils/CustomAxios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { login, logout } from "../features/memberSlice";
import { error } from "console";
import { useNavigate } from "react-router-dom";

const ModifyMyPageModal = ({ show, Close }: { show: boolean; Close: () => void }) => {
    const member = useSelector((state: RootState) => state.member); //로그인한 멤버
    console.log("수정 모달에서 출력 : ");
    console.log(member);
    const dispatch = useDispatch();
    const navi = useNavigate();
    
    const [backgroundImage, setBackgroundImage] = useState<string>();
    const [profileImage, setProfileImage] = useState<string>();
    const [inputState, setInputState] = useState<{
        nickName:string,
        email:string,
        introduce:string
    }>({
        nickName:'',
        email:'',
        introduce:''
    });

    useEffect(() => {
        setInputState({
            nickName:member.nickName,
            email:member.email,
            introduce:member.introduce
        });
    },[member])

    const inputStateHandler = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const input = e.target;
        setInputState((prev) => ({
            ...prev,
            [input.name]:input.value
        }))
    }

    // const [nickName, setNickname] = useState<string>();
    // const [email, setEmail] = useState<string>();
    // const [introduce, setIntroduce] = useState<string>();
    const [onModifying, setOnModifying] = useState<boolean>(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // useEffect(() => {
    //     if(show){
    //         const banner = user.banner ? user.banner.replace("C:\\SoundCastWorkspace\\SoundCAST_resources\\", "http://localhost:8087/") : '';
    //         const profile = user.profile ? user.profile.replace("C:\\SoundCastWorkspace\\SoundCAST_resources\\", "http://localhost:8087/") : '';
    //         console.log("배너가 잘 나오는지? :",banner);
    //         console.log("프로필사진이 잘 나오는지? : ", profile)

    //         setBackgroundImage(banner );
    //         setProfileImage(profile );
    //         setNickname(user.nickName || '');
    //         setEmail(user.email || '');
    //         setIntroduce(user.introduce || '');
    //     }
    // },[show,user]);

    const handleBackgroundChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                setBackgroundImage(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                setProfileImage(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        // Assuming the file input fields are not empty
        const backgroundFile = (document.querySelector('input[type="file"]') as HTMLInputElement)?.files?.[0];
        const profileFile = fileInputRef.current?.files?.[0];

        if (backgroundFile) formData.append('backgroundImage', backgroundFile);
        if (profileFile) formData.append('profileImage', profileFile);
        inputState.nickName && formData.append('nickName', inputState.nickName);
        inputState.email && formData.append('email', inputState.email);
        inputState.introduce && formData.append('introduce', inputState.introduce);
        member.memberNo && formData.append('memberNo', member.memberNo.toString());

        Close();
        // window.location.reload()
        // try {
        //     const response = await axios.post('http://localhost:8087/soundcast/member/modify', formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         },
        //     });
        //     console.log(response.data);
        //     // Handle successful response
        // } catch (error) {
        //     console.error('Error updating profile:', error);
        //     // Handle error response
        // }

        await axios.post('http://localhost:8087/soundcast/member/modify', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                console.log("회원 수정 출력");
                console.log(res.data);
                console.log(res.data.memberNo);
                dispatch(login({
                    member : {
                        ...member, 
                    },
                    ...res.data
                }))
                
            })
            .catch(error => {
                console.log(error);
            })
        
    };

    const leaveSubmit = () => {
          axios.post(`http://localhost:8087/soundcast/member/leave/${member.memberNo}`)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            })
            window.alert("회원 탈퇴 성공 !");
            dispatch(logout());
            navi("/");
        
    }

    const backGroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            Close();
        }
    };


    const serverImagePath = "http://localhost:8087/soundcast/resource/";
    const requestStartWith = "/SoundCAST_resources/";


    return (
        <div className={show ? "modal display-block" : "modal display-none"} onClick={backGroundClick}>
            <div className="mf-modal" style={{ backgroundColor: "#F0ECFD", borderRadius: "10px", width: "820px", height: "700px", margin: "0", position: "relative" }}>
                <button className="close-button" style={{ color: "black" }} onClick={Close}>X</button>
                <p style={{ fontSize: "30px", fontWeight: "bolder", marginBottom: "0px", marginLeft: "20px", cursor:"pointer" }}>내 정보 수정</p>
                <hr style={{ width: "95%", border: "1px solid black" }} />

                <div className="total" style={{ width: "90%", height: "80%", margin: "auto" }}>
                    <div className="modifyBanner" style={{
                        width: "100%", height: "25%", backgroundColor: "#B8CCFE", margin: "0 auto", position: "relative",
                        backgroundImage: backgroundImage ? `url(${backgroundImage})` : `url(${serverImagePath + member.banner})`,
                        backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"
                    }}>
                        <div style={{ margin: "0", display: "flex", position: "absolute", right: "15px", bottom: "15px", cursor: "pointer" }}>
                            <img src="images/modify-banner.png" style={{ width: "auto" }} />
                            <p style={{ color: "white", margin: "0", cursor:"pointer" }}>배경화면 수정</p>
                            <input type="file" accept="image/*" style={{ opacity: 0, position: "absolute", left: 0, right: 0, top: 0, bottom: 0, cursor: "pointer" }} onChange={handleBackgroundChange} />
                        </div>
                    </div>

                    <div className="mf-total" style={{ display: "flex", width: "100%", height: "25%" }}>
                        <div className="mf-profile" style={{ width: "30%", height: "100%", paddingTop: "10px", cursor: "pointer" }} onClick={triggerFileInput}>
                            <img src={profileImage ? profileImage : serverImagePath + member.profile} style={{ width: "80%", height: "85%" }} />
                            <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleProfileChange} />
                        </div>

                        <div className="nickAndeamil" style={{ width: "70%", display: "flex", flexDirection: "column", paddingTop: "10px" }}>
                            <div className="mf-nickName" style={{ width: "100%", marginBottom: "15px" }}>
                                <p style={{ marginTop: "20px", margin: "0" }}>닉네임</p>
                                <input 
                                    type="text"
                                    name="nickName"
                                    value={inputState.nickName} 
                                    onChange={inputStateHandler} 
                                    style={{ backgroundColor: "white", borderRadius: "20px", height: "20px", border: "none", width: "100%", outline: "none" }} />
                            </div>
                            <div className="mf-email" style={{ width: "100%" }}>
                                <p style={{ margin: "0" }}>이메일 주소</p>
                                <input 
                                    type="text"
                                    name="email"
                                    value={inputState.email} 
                                    onChange={inputStateHandler}
                                    style={{ backgroundColor: "white", borderRadius: "20px", height: "20px", width: "100%", border: "none", outline: "none" }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ height: "30%" }}>
                        <p style={{ marginBottom: "10px" }}>자기소개</p>
                        <textarea 
                            name="introduce"
                            value={inputState.introduce}
                            onChange={inputStateHandler}
                            style={{ width: "100%", height: "70%", backgroundColor: "white", borderRadius: "10px", outline: "none", border: "none", resize: "none" }} />
                    </div>

                    <div className="button" style={{ height: "20%", display: "flex", alignItems: "center", justifyContent: "end" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ margin: "0", justifyContent: "center", alignItems: "center", display: "flex", backgroundColor: "#00AB6B", borderRadius: "20px", width: "140px", height: "35px", fontWeight: "bolder", color: "white", textAlign: "center", cursor: "pointer" }} onClick={handleSubmit}>
                                <p>수정</p>
                            </div>
                            <div style={{ justifyContent: "center", alignItems: "center", display: "flex", marginTop: "15px", backgroundColor: "#FF3C3C", borderRadius: "20px", border: "none", width: "140px", height: "35px", textAlign: "center", fontWeight: "bolder", color: "white", cursor: "pointer"}} onClick={leaveSubmit}>
                                <p>탈퇴</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModifyMyPageModal;
