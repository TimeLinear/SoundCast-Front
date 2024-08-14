import { CSSProperties, useState } from "react";
import { initSongs, Props } from "../type/SongType";
import Player from "../components/PlayBar";
import SongItem from "../components/SongItem";
import MusicReportModal from "./MusicReportModal";

const MusicDetail = () => {

    const musicDetailContainer: CSSProperties = {
        paddingTop: "30px", backgroundColor: "#1B0140", borderRadius: "10px",
        display: "flex", flexDirection: "column", alignItems: "center", minWidth: "600px"
    };

    const [activeSongNo, setActiveSongNo] = useState<number|null>(null);

    // 신고 모달창 on/off
    const [showReportModal, setShowReportModal] = useState<boolean>(false);

    const props:Props = {
        activeSongNo,
        setActiveSongNo
    };

    const onClickReportButton = () => {
        setShowReportModal(true);
    }

    const songs = initSongs;

    return (
        <>
            <div style={{ padding: "10px", minWidth: "600px" }}>
                <div style={musicDetailContainer}>
                    <div style={{ width: "1152px", minWidth: "590px" }}>
                        <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "30px" }}>
                            <h1 style={{ margin: "0", fontFamily: "sans-serif", fontStyle: "italic", fontSize: "40px", color: "white" }}>Official</h1>
                        </div>
                        <div style={{ display: "flex", flexShrink: 0 }}>
                            <div style={{ display: "flex", flexDirection: "column", boxSizing: "border-box", width: "50%" }}>
                                <div style={{ marginBottom: "30px", display: "flex", justifyContent: "flex-start" }}>
                                    <img style={{ width: "420px" }}
                                        src="/images/default/music_default.png" alt="음원 커버 기본 이미지" />
                                </div>
                                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", margin: "10px 0", padding: "0 5px", width: "420px" }}>
                                    <img style={{ width: "70px", margin: "0 5px" }}
                                        src="/images/music/play_button.png" alt="재생 버튼" />
                                    <span style={{ color: "white", margin: "0 10px", font: "bold 20px sans-serif" }}>1:58</span>
                                    <div style={{ flexGrow: "1" }}></div>
                                    <img style={{ width: "25px", margin: "0 10px" }}
                                        src="/images/music/share_icon.png" alt="공유 버튼" />
                                </div>
                                <div style={{ display: "flex", justifyContent: "center", width: "420px", margin: "20px auto 20px 0" }}>
                                    <button
                                        style={{
                                            width: "95%", height: "60px", borderRadius: "10px", border: "2px solid white",
                                            backgroundColor: "transparent", color: "white", fontWeight: "bold", font: "bolder 20px sans-serif"
                                        }}>
                                        다운로드</button>
                                </div>
                            </div>
                            <div style={{ display: "flex", boxSizing: "border-box", width: "50%", flexDirection: "column" }}>
                                <div style={{ display: 'flex', width: "100%", justifyContent: "space-between", alignItems: "center", margin: "5px 0" }}>
                                    <h2 style={{ margin: "0", fontFamily: "sans-serif", color: "white", fontSize: "35px" }}>우주공원</h2>
                                    <img style={{ width: "30px", height: "30px" }} src="/images/music/flash.png" alt="신고 버튼" onClick={onClickReportButton}/>
                                </div>
                                <div style={{ textAlign: "start", margin: "15px 0" }}>
                                    <h3 style={{ color: "white", margin: "0", fontSize: "30px" }}>박다온</h3>
                                </div>
                                <div style={{ display: "flex", height: "100px" }}>
                                    <button style={{ font: "bold 28px", padding: "5px 10px 5px 10px", marginRight: "10px", borderRadius: "8px", alignItems: "flex-start", height: "29px" }}>Hip-Hop</button>
                                    <button style={{ font: "bold 28px", padding: "5px 10px 5px 10px", marginRight: "10px", borderRadius: "8px", alignItems: "flex-start", height: "29px" }}>Dreamy</button>
                                </div>
                                <div style={{ textAlign: "start", padding: "10px", height: "193px" }}>
                                    <pre style={{ color: "white", font: "bolder 16px sans-serif", margin: 0 }}>음원 설명 &gt; 없으면 생략</pre>
                                </div>
                                <div style={{ textAlign: "start", display: "flex", flexDirection: "column", height: "300px" }}>
                                    <h3 style={{ font: "bolder 20px sans-serif", color: "white" }}>이 음원을 사용할 경우 아래 라이선스를 표기해주세요.</h3>
                                    <div style={{ display: "flex", height: "100%" }}>
                                        <textarea
                                            style={{
                                                resize: "none", overflow: "hidden", flexGrow: "1", backgroundColor: "transparent", padding: "5px 10px 5px 10px",
                                                font: "bolder 24px sans-serif", color: "white", borderRadius: "10px 0 0 10px", border: "3px solid white"
                                            }} value="Song: Warriyo - Mortals (feat. Laura Brehm) [NCS Release]
                                            Music provided by NoCopyrightSounds
                                            Free Download/Stream: http://ncs.io/mortals
                                            Watch: http://youtu.be/yJg-Y5byMMw" disabled>
                                        </textarea>
                                        <button style={{ border: "1px solid white", backgroundColor: "white", borderRadius: "0 10px 10px 0", marginLeft:"-2px"}}><img src="/images/music/paste_icon.png" alt="복사 버튼" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ textAlign: "start" }}>
                                <label style={{ color: "white", font: "bold 24px sans-serif" }}>이 아티스트의 다른 음원입니다.</label>
                            </div>
                            <SongItem activeSongNo={activeSongNo} setActiveSongNo={setActiveSongNo} songs={songs}/>
                        </div>
                    </div>
                </div>
            </div>
            {showReportModal && <MusicReportModal/>}
            <Player {...props} />
        </>
    );
}

export default MusicDetail;