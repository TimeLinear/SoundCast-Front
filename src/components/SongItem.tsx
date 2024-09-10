import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CSSProperties, MouseEvent, useEffect, useState } from "react";
import { setPlaySong, setSongList  } from "../features/songSlice";
import { Song } from "../type/SongType";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import { setGenre, setMood } from "../features/searchSlice";
import axios from "axios";

const SongItem = ({ activeSongNo, setActiveSongNo, song, searchSong }: { activeSongNo: number | null, setActiveSongNo: (no: number) => void, song: { list: Song[], currentSong: Song }, searchSong: () => void }) => {

    const searchListBoxStyle: CSSProperties = {
        width: "100%", height: "80px", display: "flex", alignItems: "center", justifyContent: "space-evenly",
        background: "#1C003B", borderTop: "1px solid #FFFFFF"
    };
    const searchListFontStyle: CSSProperties = { fontFamily: "Inter", fontStyle: "normal", fontSize: "20px", fontWeight: "700", lineHeight: "24px" };
    const itemBoxStyle: CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center", width: "120px", height: "38px", background: "#FFFFFF", borderRadius: "10px" };
    const iconBoxSizeStyle: CSSProperties = { height: "35px", width: "35px", cursor: "pointer" };

    const selectedCategoryStyle: CSSProperties = { background: "#BA9FCC", color: "white", cursor: "pointer" };

    const [hoverState, setHoverState] = useState({ songNo: 0, class: "" });

    const mouseEnterEventHandler = (e: MouseEvent) => {
        const songNo = (e.target as HTMLDivElement).dataset.songno;
        const classname = (e.target as HTMLDivElement).className;
        const songTypeNo = (e.target as HTMLDivElement).dataset.typeno;

        setHoverState({ songNo: Number(songNo), class: classname })

        if (classname === 'genre-box') { dispatch(setGenre(Number(songTypeNo))) }
        else if (classname === 'mood-box') { dispatch(setMood(Number(songTypeNo))) }
    };

    const search = useSelector((state: RootState) => state.search)
    const mouseLeaveEventHandler = (e: MouseEvent) => {
        setHoverState({ songNo: 0, class: '' })

        const classname = (e.target as HTMLDivElement).className;
        console.log(search.genre, search.mood, classname)
        if (classname === 'genre-box') { dispatch(setGenre(-1)) }
        else if (classname === 'mood-box') { dispatch(setMood(-1)) }
    };

    const dispatch = useDispatch();
    const navi = useNavigate();

    const handleIconClick = (id: number) => {
        setActiveSongNo(id === activeSongNo ? 0 : id);
    };

    useEffect(() => {
        if (activeSongNo) {
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

    const copySongAddress = (songNo: number) => {
        const songAddress = "http://localhost:3000/song/detail/" + songNo;
        navigator.clipboard.writeText(songAddress)
            .then(() => { alert("음원 상세페이지 주소가 복사되었습니다!") })
            .catch((err) => { console.log(err) })
    };

    const itemsPerPage = 10;

    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages: number = Math.ceil(song.list.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = song.list.slice(indexOfFirstItem, indexOfLastItem);

    // console.log(hoverState);


    //수정 (검색함수 props에 추가, 이미지 경로 지정, 아티스트명 클릭시 아티스트 페이지로 이동, 장르, 분위기 data-songno 수정 클릭 이벤트 부여)
    const url = "http://localhost:8087/soundcast/resource/";
    const member = useSelector((state: RootState) => state.member)

    //----다운로드 추가 -- 2024-08-29
    const handleDownload = (song: Song) => {
        console.log(member.memberNo);

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

    return (
        <div>
            <div style={{ borderRadius: "10px", overflow: "hidden" }}>
                {
                    currentItems.map(Song => (
                        //검색결과를 플레이리스트로 반환 (반복)
                        <div key={Song.songNo}>
                            <div className='search-list' style={{ ...searchListBoxStyle }}>
                                <div className='play-icon' style={{ ...iconBoxSizeStyle, width: "50px", height: "50px" }} >
                                    <img src={url + (Song.songNo === activeSongNo ? "public/song/pause-button-icon-white.png" : "public/song/play_button.png")}
                                        style={{ height: "100%", width: "100%" }}
                                        onClick={() => handleIconClick(Song.songNo)} />
                                </div>
                                {/* 이미지 있는 경우 해당 이미지 보여주기, 없는 경우 default image */}
                                <div className='song-image' style={{ width: "50px", height: "50px" }}>
                                    <img src={url + ( Song.songImage ? Song.songImage.songImagePathName + Song.songImage.songImageName : "public/default/song_image.png")} 
                                        style={{ height: "100%", width: "100%" }} />
                                </div>
                                <div className='song-content' style={{ width: "260px", height: "50px", textAlign: "start", paddingLeft: "20px" }}>
                                    <div className='song-title' style={{ height: "50%" }}>
                                        <span className='song-title'
                                            onMouseEnter={mouseEnterEventHandler}
                                            onMouseLeave={mouseLeaveEventHandler}
                                            onClick={() => { dispatch(setPlaySong(Song.songNo)); navi(`/song/detail/${hoverState.songNo}`); }}
                                            data-songno={Song.songNo}
                                            style={hoverState.class === 'song-title' && hoverState.songNo === Song.songNo ?
                                                { ...searchListFontStyle, color: "magenta", cursor: "pointer" } : { ...searchListFontStyle, color: "#FFFFFF", cursor: "pointer" }}>
                                            {Song.songTitle}
                                        </span>
                                    </div>
                                    <div className='artist-name' style={{ height: "50%" }}>
                                        <span className="artist-name"
                                            onMouseEnter={mouseEnterEventHandler}
                                            onMouseLeave={mouseLeaveEventHandler}
                                            onClick={() => { navi(`/member/memberInfo/${Song.songMemberNo}`) }}
                                            data-songno={Song.songNo}
                                            style={hoverState.class === 'artist-name' && hoverState.songNo === Song.songNo ?
                                                { ...searchListFontStyle, fontSize: "15px", lineHeight: "18px", color: "magenta", cursor: "pointer" }
                                                : { ...searchListFontStyle, fontSize: "15px", lineHeight: "18px", color: "white", cursor: "pointer" }}>
                                            {Song.memberNickname}
                                        </span>
                                    </div>
                                </div>

                                {/* 재생중일 때 나타나는 헤드폰 아이콘 */}
                                <div className='headphone-icon' style={{ ...iconBoxSizeStyle, margin: "0 30px" }}>
                                    {activeSongNo === Song.songNo && (<img src={url + "public/song/headphone-icon.png"} style={{ height: "100%", width: "100%", cursor: "default" }} />)}
                                </div>

                                <div className='genre-box'
                                    onMouseEnter={mouseEnterEventHandler}
                                    onMouseLeave={mouseLeaveEventHandler}
                                    onClick={searchSong}
                                    data-songno={Song.songNo}
                                    data-typeno={Song.songGenreNo}
                                    style={hoverState.class === 'genre-box' && hoverState.songNo === Song.songNo ? { ...itemBoxStyle, ...selectedCategoryStyle } : { ...itemBoxStyle }}>
                                    <span style={{ ...searchListFontStyle }}>{Song.songGenreName}</span>
                                </div>
                                <div className='mood-box'
                                    onMouseEnter={mouseEnterEventHandler}
                                    onMouseLeave={mouseLeaveEventHandler}
                                    data-songno={Song.songNo}
                                    data-typeno={Song.songMoodNo}
                                    onClick={searchSong}
                                    style={hoverState.class === 'mood-box' && hoverState.songNo === Song.songNo ? { ...itemBoxStyle, ...selectedCategoryStyle } : { ...itemBoxStyle }}>
                                    <span style={{ ...searchListFontStyle }}>{Song.songMoodName}</span>
                                </div>

                                {/* 라이센스가 있을 경우 나타나는 아이콘 */}
                                <div className='license-icon' style={{ ...iconBoxSizeStyle, cursor: "default" }}>
                                    {Song.songLicense !== null &&
                                        (<img src={url + "public/song/license-icon.png"} style={{ height: "100%", width: "100%", cursor: "default" }} />)
                                    }
                                </div>

                                <div className='play-time-box' style={{ display: "flex", alignItems: "center", height: "38px" }}>
                                    <div className='clock-icon' style={{ ...iconBoxSizeStyle, marginRight: "10px" }}>
                                        <img src={url + "public/song/clock-icon.png"} style={{ height: "100%", width: "100%", cursor: "default" }} />
                                    </div>
                                    <div className='play-time'>
                                        <span style={{ ...searchListFontStyle, color: "white" }}>{Song.songDuration ? Song.songDuration : ''}</span>
                                    </div>
                                </div>

                                <div className='download-box' style={{ ...itemBoxStyle }}>
                                    {/* 다운로드 버튼 변경 - 2024-08-29 */}
                                    <button
                                        onClick={() => handleDownload(Song)}
                                        style={{
                                            ...searchListFontStyle,
                                            border: "0",
                                            background: "#FFFFFF",
                                            height: "100%",
                                            width: "100%",
                                            borderRadius: "10px",
                                            cursor: "pointer"
                                        }}>다운로드</button>
                                </div>

                                <div className='share-icon' style={{ ...iconBoxSizeStyle }}>
                                    <img src={url + 'public/song/share_icon.png'}
                                        onClick={() => copySongAddress(Song.songNo)}
                                        style={{ height: "100%", width: "100%" }} />
                                </div>

                                {/* 클릭했을 경우 라이센스를 표기하는 아래 박스가 표시됨 */}
                                <div className='open-icon' style={{ ...iconBoxSizeStyle }} >
                                    {Song.songLicense !== null &&
                                        (<img src={url + (licenseItem === Song.songNo ? "public/song/open-icon-now.png" : "public/song/open-icon.png")}
                                            style={{ height: "100%", width: "100%" }}
                                            onClick={() => { handleLicenseClick(Song.songNo) }} />)
                                    }
                                </div>
                            </div>
                            {
                                licenseItem === Song.songNo &&
                                (<div className="license-box" style={{ ...searchListBoxStyle, alignItems: "", border: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: "10px", borderBottomLeftRadius: "10px" }}>
                                    <div className="license-text-box" style={{ ...searchListBoxStyle, width: "98%", height: "85%", background: "#FFFFFF", borderRadius: "10px", textAlign: "start", alignItems: "center" }}>
                                        <p style={{ font: "bold 18px Inter", width: "85%", height: "85%", margin: "0", textOverflow: "ellipsis" }}>{Song.songLicense}</p>
                                        <div className='license-copy-icon'
                                            onClick={() => { if (Song.songLicense !== null) { licenseCopy(Song.songLicense) } }}
                                            style={{ ...itemBoxStyle, background: "#1C003B", width: "10%", height: "65%" }} >
                                            <img src={url + "public/song/copy-Icon-white.png"} />
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>)
                    )
                }
            </div>
            <div style={{ margin: "20px 0" }}>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}

export default SongItem;