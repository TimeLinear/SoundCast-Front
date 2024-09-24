import { CSSProperties, useEffect, useState } from "react";
import { Props, Song } from "../type/SongType";
import Player from "../components/PlayBar";
import SongItem from "../components/SongItem";
import MusicReportModal from "./MusicReportModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import axios from "../utils/CustomAxios";
import { setPlaySong, setSongList } from "../features/songSlice";
import { setGenre, setKeyword, setMood } from "../features/searchSlice";

const MusicDetail = () => {

    const [activeSongNo, setActiveSongNo] = useState<number | null>(null);

    // 신고 모달창 on/off
    const [showReportModal, setShowReportModal] = useState<boolean>(false);

    const song = useSelector((state:RootState) => state.song);

    const currSong = song.currentSong;

    const search = useSelector((state:RootState)=>state.search);
    const member = useSelector((state:RootState) => state.member);
    const dispatch = useDispatch();
    const navi = useNavigate();
    const searchSong = () => {
        axios.get(`http://localhost:8087/soundcast/song/search`, {params : search})
          .then((response) => {
              //키워드로 db에 저장된 노래 불러와 리스트 전역에 저장
              console.log(response.data);
              dispatch(setSongList(response.data));
            })
          .catch((err)=>console.log(err));
  
        navi("/search");
    };

    const props:Props = {
        activeSongNo,
        setActiveSongNo,
        song: {...song, list: song.list.filter((songItem) => songItem.songNo !== currSong.songNo)},
        searchSong
    };

    const onClickReportButton = () => {
        setShowReportModal(true);
    }

    const [isArtistHover, setIsArtistHover] = useState(false);

    const mouseEnterEventHandler = () => {
        setIsArtistHover(true);
    }

    const mouseLeaveEventHandler = () => {
        setIsArtistHover(false);
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

    useEffect(() => {
        axios.get(`http://localhost:8087/soundcast/song/memberSongList/${currSong.songMemberNo}`)
            .then((response) => {
                //키워드로 db에 저장된 노래 불러와 리스트 전역에 저장
                console.log(response.data);
                dispatch(setSongList(response.data));
            })
            .catch((err) => console.log(err));
        return () => {
            dispatch(setPlaySong(0));
        }
    }, [])

    const handleDownload = (song: Song) => {

        try {
            axios.get(`http://localhost:8087/soundcast/song/download/${song.songNo}`, { params: { memberNo: member.memberNo }, responseType: 'blob' })
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;

                    link.setAttribute('download', song.songFile.songFileOriginName);

                    document.body.appendChild(link);
                    link.click();

                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                    alert("다운로드 완료!")
                })
                .catch(err => {
                    alert("다운로드가 실패하였습니다.");
                    console.log(err)
                })
        }
        catch (error) {
            console.log(error);
        }
    }

    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlaying = () => {
        if(!isPlaying) {
            setActiveSongNo(currSong.songNo);      
        } else {
            setActiveSongNo(null);
        }
        setIsPlaying(!isPlaying);
    }

    return (
        <>
            <div style={{...containerStyle}}>
                <div style={musicDetailContainer}>
                    <div style={{ width: "1152px", minWidth: "590px" }}>
                        <div style={{ ...commonFlexStyle, justifyContent: "flex-start", marginBottom: "30px" }}>
                            <h1 style={OfficialTitleStyle}>{currSong.songPlaceNo === 0 ? "Official" : "Unofficial"}</h1>
                        </div>
                        <div style={{ ...commonFlexStyle, flexShrink: 0 }}>
                            <div style={{ ...commonFlexStyle, flexDirection: "column", boxSizing: "border-box", width: "50%" }}>
                                <div style={{ ...commonFlexStyle, justifyContent: "flex-start", marginBottom: "30px" }}>
                                    <img style={{ width: "420px" }} 
                                        src={serverResourcePath + (currSong.songImage.songImageName ? 
                                            currSong.songImage.songImagePathName + currSong.songImage.songImageName
                                            : "public/song/song-image.png")} alt="음원 커버 이미지" />
                                </div>
                                <div style={{ ...commonFlexStyle, justifyContent: "flex-start", alignItems: "center", margin: "10px 0", padding: "0 5px", width: "420px" }}>
                                    <img 
                                        style={{ width: "70px", height: "70px", margin: "0 5px", cursor: "pointer" }} 
                                        src={ serverResourcePath + (isPlaying ? "public/song/Pause_button.png" : "public/song/play_button.png")}
                                        onClick={togglePlaying}
                                        alt="재생 버튼" 
                                    />
                                    <span style={{ ...commonTextStyle, margin: "0 10px", font: "bold 20px sans-serif" }}>1:58</span>
                                    <div style={{ flexGrow: "1" }}></div>
                                    <img style={{ width: "25px", margin: "0 10px" }} src={serverResourcePath + "public/song/share_icon.png"} alt="공유 버튼" />
                                </div>
                                <div style={{ ...commonFlexStyle, justifyContent: "center", width: "420px", margin: "20px auto 20px 0" }}>
                                    <button style={{...downloadButtonStyle, cursor: "pointer"}} onClick={() => {handleDownload(currSong)}}>다운로드</button>
                                </div>
                            </div>
                            <div style={{ ...commonFlexStyle, boxSizing: "border-box", width: "50%", flexDirection: "column" }}>
                                <div style={{ ...commonFlexStyle, width: "100%", justifyContent: "space-between", alignItems: "center", margin: "5px 0" }}>
                                    <h2 style={{ ...commonTextStyle, ...commonFontStyle, fontSize: "35px" }}>{currSong.songTitle}</h2>
                                    <img style={{ width: "30px", height: "30px" }} src={serverResourcePath + "public/song/flash.png"}
                                        alt="신고 버튼"
                                        onClick={onClickReportButton} />
                                </div>
                                <div 
                                    style={{ textAlign: "start", margin: "15px 0" }}
                                    onClick={() => { navi(`/member/memberInfo/${currSong.songMemberNo}`) }}>
                                    <h3 
                                        style={{ ...commonTextStyle, display: "inline-block", fontSize: "30px", cursor: "pointer", color: isArtistHover ? "magenta" : "white" }}
                                        onMouseEnter={mouseEnterEventHandler}
                                        onMouseLeave={mouseLeaveEventHandler}
                                    >
                                        {currSong.memberNickname}
                                    </h3>
                                </div>
                                <div style={{ ...commonFlexStyle, height: "30px" }}>
                                    <button style={buttonStyle}>{currSong.songGenreName}</button>
                                    <button style={buttonStyle}>{currSong.songMoodName}</button>
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
                                            <img src={serverResourcePath + "public/song/paste_icon.png"} alt="복사 버튼" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ ...commonFlexStyle, flexDirection: "column", marginTop:"80px" }}>
                            <div style={{ textAlign: "start" }}>
                                <label style={{ ...commonTextStyle, font: "bold 24px sans-serif" }}>이 아티스트의 다른 음원입니다.</label>
                            </div>
                            <SongItem {...props}
                            />
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