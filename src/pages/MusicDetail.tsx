import { CSSProperties, useState } from "react";
import { initSongList, Props } from "../type/SongType";
import Player from "../components/PlayBar";
import SongItem from "../components/SongItem";
import MusicReportModal from "./MusicReportModal";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const MusicDetail = () => {

    const {musicNo} = useParams();

    const [activeSongNo, setActiveSongNo] = useState<number | null>(null);

    // 신고 모달창 on/off
    const [showReportModal, setShowReportModal] = useState<boolean>(false);

    const song = useSelector((state:RootState) => state.song);

    const currSong = song.currentSong;

    const props:Props = {
        activeSongNo,
        setActiveSongNo,
        song
    };

    const onClickReportButton = () => {
        setShowReportModal(true);
    }

    const commonFlexStyle:CSSProperties = {
        display: "flex",
    };

    const commonTextStyle:CSSProperties = {
        color: "white",
        margin: "0",
    };

    const commonFontStyle:CSSProperties = {
        fontFamily: "sans-serif",
    };

    const containerStyle:CSSProperties = {
        padding: "10px",
        minWidth: "600px",
    };

    const musicDetailContainer:CSSProperties = {
        paddingTop: "30px", backgroundColor: "#1B0140", borderRadius: "10px",
        display: "flex", flexDirection: "column", alignItems: "center", minWidth: "1280px"
    };

    const OfficialTitleStyle:CSSProperties = {
        ...commonTextStyle,
        ...commonFontStyle,
        fontStyle: "italic",
        fontSize: "40px",
    };

    const buttonStyle: CSSProperties = {
        font: "bold 28px",
        padding: "5px 10px",
        marginRight: "10px",
        borderRadius: "8px",
        alignItems: "flex-start",
        height: "29px",
    };

    const licenseTextareaStyle: CSSProperties = {
        resize: "none",
        overflow: "hidden",
        flexGrow: "1",
        backgroundColor: "transparent",
        padding: "5px 10px",
        font: "bolder 24px sans-serif",
        color: "white",
        borderRadius: "10px 0 0 10px",
        border: "3px solid white",
    };

    const buttonCommonStyle: CSSProperties = {
        backgroundColor: "transparent",
        color: "white",
        border: "2px solid white",
        font: "bolder 20px sans-serif",
    };

    const downloadButtonStyle: CSSProperties = {
        ...buttonCommonStyle,
        width: "95%",
        height: "60px",
        borderRadius: "10px",
    };

    const serverResourcePath = "http://localhost:8087/soundcast/resource/"

    return (
        <>
            <div style={{...containerStyle}}>
                <div style={musicDetailContainer}>
                    <div style={{ width: "1152px", minWidth: "590px" }}>
                        <div style={{ ...commonFlexStyle, justifyContent: "flex-start", marginBottom: "30px" }}>
                            <h1 style={OfficialTitleStyle}>{currSong.songPlaceNo === 1 ? "Official" : "Unofficial"}</h1>
                        </div>
                        <div style={{ ...commonFlexStyle, flexShrink: 0 }}>
                            <div style={{ ...commonFlexStyle, flexDirection: "column", boxSizing: "border-box", width: "50%" }}>
                                <div style={{ ...commonFlexStyle, justifyContent: "flex-start", marginBottom: "30px" }}>
                                    <img style={{ width: "420px" }} 
                                        src={currSong.songImage.songImageName ? 
                                            currSong.songImage.songImagePathName + currSong.songImage.songImageName : "/images/default/song_default.png"} alt="음원 커버 이미지" />
                                </div>
                                <div style={{ ...commonFlexStyle, justifyContent: "flex-start", alignItems: "center", margin: "10px 0", padding: "0 5px", width: "420px" }}>
                                    <img style={{ width: "70px", margin: "0 5px" }} src="/images/song/play_button.png" alt="재생 버튼" />
                                    <span style={{ ...commonTextStyle, margin: "0 10px", font: "bold 20px sans-serif" }}>1:58</span>
                                    <div style={{ flexGrow: "1" }}></div>
                                    <img style={{ width: "25px", margin: "0 10px" }} src="/images/song/share_icon.png" alt="공유 버튼" />
                                </div>
                                <div style={{ ...commonFlexStyle, justifyContent: "center", width: "420px", margin: "20px auto 20px 0" }}>
                                    <button style={downloadButtonStyle}>다운로드</button>
                                </div>
                            </div>
                            <div style={{ ...commonFlexStyle, boxSizing: "border-box", width: "50%", flexDirection: "column" }}>
                                <div style={{ ...commonFlexStyle, width: "100%", justifyContent: "space-between", alignItems: "center", margin: "5px 0" }}>
                                    <h2 style={{ ...commonTextStyle, ...commonFontStyle, fontSize: "35px" }}>{currSong.songTitle}</h2>
                                    <img style={{ width: "30px", height: "30px" }} src="/images/song/flash.png" alt="신고 버튼" onClick={onClickReportButton} />
                                </div>
                                <div style={{ textAlign: "start", margin: "15px 0" }}>
                                    <h3 style={{ ...commonTextStyle, fontSize: "30px" }}>{currSong.memberNickname}</h3>
                                </div>
                                <div style={{ ...commonFlexStyle, height: "30px" }}>
                                    <button style={buttonStyle}>Hip-Hop</button>
                                    <button style={buttonStyle}>Dreamy</button>
                                </div>
                                <hr style={{margin:"10px 0", width:"80%", opacity:"0.5"}}/>
                                <div style={{ textAlign: "start", padding: "0 10px", height: "193px" }}>
                                    <pre style={{ ...commonTextStyle, font: "bolder 16px sans-serif", margin: 0 }}>{currSong.songDetail}</pre>
                                </div>
                                <div style={{ textAlign: "start", ...commonFlexStyle, flexDirection: "column", height: "300px" }}>
                                    <h3 style={{ font: "bolder 20px sans-serif", color: "white" }}>이 음원을 사용할 경우 아래 라이선스를 표기해주세요.</h3>
                                    <div style={{ ...commonFlexStyle, height: "100%" }}>
                                        <textarea style={licenseTextareaStyle} value={currSong.songLicense ? currSong.songLicense : ''} disabled>
                                        </textarea>
                                        <button style={{ border: "1px solid white", backgroundColor: "white", borderRadius: "0 10px 10px 0", marginLeft: "-2px" }}>
                                            <img src="/images/song/paste_icon.png" alt="복사 버튼" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ ...commonFlexStyle, flexDirection: "column", marginTop:"80px" }}>
                            <div style={{ textAlign: "start" }}>
                                <label style={{ ...commonTextStyle, font: "bold 24px sans-serif" }}>이 아티스트의 다른 음원입니다.</label>
                            </div>
                            <SongItem activeSongNo={activeSongNo} setActiveSongNo={setActiveSongNo} song={song} />
                        </div>
                    </div>
                </div>
            </div>

            {showReportModal && <MusicReportModal setShowReportModal={setShowReportModal}/>}
            <Player {...props} />
        </>
    );
}

export default MusicDetail;