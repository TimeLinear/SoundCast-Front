import { useRef, useState } from "react";
import axios from "../utils/CustomAxios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ModifyMyPageModal = ({ show, Close }: { show: boolean; Close: () => void }) => {
    const user = useSelector((state: RootState) => state.member);

    const [backgroundImage, setBackgroundImage] = useState<string>("");
    const [profileImage, setProfileImage] = useState<string>("");
    const [nickName, setNickname] = useState<string>(user.nickName || '');
    const [email, setEmail] = useState<string>(user.email || '');
    const [introduce, setIntroduce] = useState<string>(user.introduce || '');

    const fileInputRef = useRef<HTMLInputElement | null>(null);

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
        formData.append('nickName', nickName);
        formData.append('email', email);
        formData.append('introduce', introduce);

        try {
            const response = await axios.post('http://localhost:8087/soundcast/member/modify', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                    
                },
            });
            console.log(response.data);
            // Handle successful response
        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle error response
        }
    };

    const backGroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            Close();
        }
    };

    return (
        <div className={show ? "modal display-block" : "modal display-none"} onClick={backGroundClick}>
            <div className="mf-modal" style={{ backgroundColor: "#F0ECFD", borderRadius: "10px", width: "820px", height: "700px", margin: "0", position: "relative" }}>
                <button className="close-button" style={{ color: "black" }} onClick={Close}>X</button>
                <p style={{ fontSize: "30px", fontWeight: "bolder", marginBottom: "0px", marginLeft: "20px" }}>내 정보 수정</p>
                <hr style={{ width: "95%", border: "1px solid black" }} />

                <div className="total" style={{ width: "90%", height: "80%", margin: "auto" }}>
                    <div className="modifyBanner" style={{
                        width: "100%", height: "25%", backgroundColor: "#B8CCFE", margin: "0 auto", position: "relative",
                        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
                        backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"
                    }}>
                        <div style={{ margin: "0", display: "flex", position: "absolute", right: "15px", bottom: "15px", cursor: "pointer" }}>
                            <img src="images/modify-banner.png" style={{ width: "auto" }} />
                            <p style={{ color: "white", margin: "0" }}>배경화면 수정</p>
                            <input type="file" accept="image/*" style={{ opacity: 0, position: "absolute", left: 0, right: 0, top: 0, bottom: 0, cursor: "pointer" }} onChange={handleBackgroundChange} />
                        </div>
                    </div>

                    <div className="mf-total" style={{ display: "flex", width: "100%", height: "25%" }}>
                        <div className="mf-profile" style={{ width: "30%", height: "100%", paddingTop: "10px", cursor: "pointer" }} onClick={triggerFileInput}>
                            <img src={profileImage || "images/modify-pro.png"} style={{ width: "80%", height: "85%" }} />
                            <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleProfileChange} />
                        </div>

                        <div className="nickAndeamil" style={{ width: "70%", display: "flex", flexDirection: "column", paddingTop: "10px" }}>
                            <div className="mf-nickName" style={{ width: "100%", marginBottom: "15px" }}>
                                <p style={{ marginTop: "20px", margin: "0" }}>닉네임</p>
                                <input type="text" value={nickName} onChange={(e) => setNickname(e.target.value)} style={{ backgroundColor: "white", borderRadius: "20px", height: "20px", border: "none", width: "100%", outline: "none" }} />
                            </div>
                            <div className="mf-email" style={{ width: "100%" }}>
                                <p style={{ margin: "0" }}>이메일 주소</p>
                                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={{ backgroundColor: "white", borderRadius: "20px", height: "20px", width: "100%", border: "none", outline: "none" }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ height: "30%" }}>
                        <p style={{ marginBottom: "10px" }}>자기소개</p>
                        <textarea value={introduce} onChange={(e) => setIntroduce(e.target.value)} style={{ width: "100%", height: "70%", backgroundColor: "white", borderRadius: "10px", outline: "none", border: "none", resize: "none" }} />
                    </div>

                    <div className="button" style={{ height: "20%", display: "flex", alignItems: "center", justifyContent: "end" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ margin: "0", justifyContent: "center", alignItems: "center", display: "flex", backgroundColor: "#00AB6B", borderRadius: "20px", width: "140px", height: "35px", fontWeight: "bolder", color: "white", textAlign: "center", cursor: "pointer" }} onClick={handleSubmit}>
                                <p>수정</p>
                            </div>
                            <div style={{ justifyContent: "center", alignItems: "center", display: "flex", marginTop: "15px", backgroundColor: "#FF3C3C", borderRadius: "20px", border: "none", width: "140px", height: "35px", textAlign: "center", fontWeight: "bolder", color: "white", cursor: "pointer" }}>
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
