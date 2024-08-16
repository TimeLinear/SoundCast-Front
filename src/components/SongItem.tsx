import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CSSProperties, useEffect, useState } from "react";
import { setPlaySong } from "../features/songSlice";
import { Song } from "../type/SongType";

const SongItem = ({ activeSongNo, setActiveSongNo, songs }: { activeSongNo: number | null, setActiveSongNo: (no: number) => void, songs: Song[] }) => {

    const searchListBoxStyle:CSSProperties = {
        width: "100%", height: "80px", display: "flex", alignItems: "center", justifyContent: "space-evenly",
        background: "#1C003B", borderTop: "1px solid #FFFFFF"
    };
    const searchListFontStyle:CSSProperties = { fontFamily: "Inter", fontStyle: "normal", fontSize: "20px", fontWeight: "700", lineHeight: "24px", color: "#000000" };
    const itemBoxStyle:CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center", width: "120px", height: "38px", background: "#FFFFFF", borderRadius: "10px" };
    const iconBoxSizeStyle:CSSProperties = { height: "35px", width: "35px"};

    const song = useSelector((state: RootState) => state.song);
    const dispatch = useDispatch();

    const handleIconClick = (id: number) => {
        setActiveSongNo(id === activeSongNo ? 0 : id);
    };

    useEffect(() => {
        if (activeSongNo !== null) {
            dispatch(setPlaySong(activeSongNo));
        }
    }, [activeSongNo]);

    const [licenseItem, setLicenseItem] = useState<number>(0);
    const handleLicenseClick = (id: number) => {
        setLicenseItem(id === licenseItem ? 0 : id);
    }
    const licenseCopy = (license: string) => {
        navigator.clipboard.writeText(license)
            .then(() => { alert("음원의 라이선스가 복사되었습니다!") })
            .catch((err) => { console.log(err) })
    };

    return (
        <>
            {
                songs.map(Song => (
                    //검색결과를 플레이리스트로 반환 (반복)
                    <>
                        <div className='search-list' key={Song.songNo} style={{ ...searchListBoxStyle }}>

                            <div className='play-icon' style={{ ...iconBoxSizeStyle }} >
                                <img src={Song.songNo === activeSongNo ? "/images/music/pause-button-icon-white.png" : "/images/music/play-icon-white.png"}
                                    style={{ height: "100%", width: "100%" }}
                                    onClick={() => handleIconClick(Song.songNo)} />
                            </div>
                            {/* 이미지 있는 경우 해당 이미지 보여주기, 없는 경우 default image */}
                            <div className='song-image' style={{ width: "50px", height: "50px" }}>
                                <img src='/images/music/song-image.png' style={{ height: "100%", width: "100%" }} />
                            </div>
                            <div className='song-content' style={{ width: "260px", height: "50px", textAlign: "start", paddingLeft: "20px" }}>
                                <div className='song-title' style={{ height: "50%" }}>
                                    <span style={{ ...searchListFontStyle, color: "#FFFFFF" }}>{Song.songTitle}</span>
                                </div>
                                <div className='artist-name' style={{ height: "50%" }}>
                                    <span style={{ ...searchListFontStyle, fontSize: "15px", lineHeight: "18px", color: "#FFFFFF" }}>{Song.songMemberNo}</span>
                                </div>
                            </div>

                            {/* 재생중일 때 나타나는 헤드폰 아이콘 */}
                            <div className='headphone-icon' style={{ ...iconBoxSizeStyle, margin:"0 30px"}}>
                                {activeSongNo === Song.songNo && (<img src="/images/music/headphone-icon.png" style={{ height: "100%", width: "100%" }} />)}
                            </div>

                            <div className='genre-box' style={{ ...itemBoxStyle }}>
                                <span style={{ ...searchListFontStyle }}>{Song.songGenreNo}</span>
                            </div>
                            <div className='mood-box' style={{ ...itemBoxStyle }}>
                                <span style={{ ...searchListFontStyle }}>{Song.songMoodNo}</span>
                            </div>

                            {/* 라이센스가 있을 경우 나타나는 아이콘 */}
                            <div className='license-icon' style={{ ...iconBoxSizeStyle }}>
                                {Song.songLicense !== null &&
                                    (<img src='/images/music/license-icon.png' style={{ height: "100%", width: "100%" }} />)
                                }
                            </div>

                            <div className='play-time-box' style={{ display: "flex", alignItems: "center", height: "38px" }}>
                                <div className='clock-icon' style={{ ...iconBoxSizeStyle, marginRight:"10px"}}>
                                    <img src='/images/music/clock-icon.png' style={{ height: "100%", width: "100%" }} />
                                </div>
                                <div className='play-time'>
                                    <span style={{ ...searchListFontStyle, color: "#FFFFFF" }}>1:58</span>
                                </div>
                            </div>

                            <div className='download-box' style={{ ...itemBoxStyle }}>
                                <span style={{ ...searchListFontStyle }}>다운로드</span>
                            </div>

                            <div className='share-icon' style={{ ...iconBoxSizeStyle }}>
                                <img src='/images/music/share_icon.png' style={{ height: "100%", width: "100%" }} />
                            </div>

                            {/* 클릭했을 경우 라이센스를 표기하는 아래 박스가 표시됨 */}
                            <div className='open-icon' style={{ ...iconBoxSizeStyle }} >
                                {Song.songLicense !== null &&
                                    (<img src={licenseItem === Song.songNo ? "/images/music/open-icon-now.png" : "/images/music/open-icon.png"}
                                        style={{ height: "100%", width: "100%" }}
                                        onClick={() => { handleLicenseClick(Song.songNo) }} />)
                                }
                            </div>
                        </div>
                        {
                            licenseItem === Song.songNo &&
                            (<div className="license-box" style={{ ...searchListBoxStyle, alignItems: "", border: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: "10px", borderBottomLeftRadius: "10px" }}>
                                <div className="license-text-box" style={{ ...searchListBoxStyle, width: "98%", height: "85%", background: "#FFFFFF", borderRadius: "10px", textAlign:"start", alignItems:"center"}}>
                                    <p style={{font:"bold 18px Inter", width: "85%", height: "85%", margin:"0", textOverflow:"ellipsis"}}>{Song.songLicense}ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ</p>
                                    <div className='license-copy-icon'
                                        onClick={() => { if (Song.songLicense !== null) { licenseCopy(Song.songLicense) } }}
                                        style={{ ...itemBoxStyle, background: "#1C003B", width: "10%", height: "65%" }} >
                                        <img src="/images/music/copy-Icon-white.png" />
                                    </div>
                                </div>
                            </div>)
                        }
                    </>)
                )
            }
        </>
    );
}

export default SongItem;