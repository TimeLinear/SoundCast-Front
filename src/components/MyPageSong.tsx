import { useEffect, useState } from "react";
import { setGenre, setMood } from "../features/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import { Song } from "../type/SongType";
import { setPlaySong } from "../features/songSlice";
import { useNavigate } from "react-router-dom";
import ModifyMusic from "../pages/ModifyMusic";

const MyPageSong = ({ activeSongNo, setActiveSongNo, song, searchSong }: { activeSongNo: number | null, setActiveSongNo: (no: number) => void, song:{list:Song[], currentSong:Song}, searchSong:()=>void })  =>{
   
    const [hoverState, setHoverState] = useState({ songNo: 0, class: "" });

    const dispatch = useDispatch();
    const navi = useNavigate();

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

    

    const itemsPerPage = 20;

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
    const url = "http://localhost:8087/soundcast/public"; 


    //모디파이
    const [showModifySong, setShowModifySong] = useState(false);
    const modifySongHandler = () =>{
        setShowModifySong(true);
    }
    const modifySongCloseHandler =() =>{
        setShowModifySong(false);
    }

    return(
        <div className="mysong" style={{ border: "1px solid lightgrey", display: "flex", flexWrap: "wrap"}}>

        {currentItems.map((Song,index) => (
            <div key = {index} style={{ margin: "20px 2.39%", width: "194px", height: "220px", display: "flex", flexDirection: "column" }}>

                <div className="hoverImage" style={{ width: "100%", height: "154px", boxSizing: "border-box", flexGrow: "1", position:"relative" }}>
                    <img className="modifyImage" src="/images/mypage-hover.png" style={{position:"absolute",width:"30px",height:"30px",top:"10px",left:"10px"}} onClick={modifySongHandler} />
                    <img src={Song.songImage.songImageNo !== 0 ? url+Song.songImage.songImagePathName+"/"+Song.songImage.songImageName : '/images/song/song-image.png'} style={{ width: "100%", height: "100%", objectFit: "cover", borderTopLeftRadius: "7px", borderTopRightRadius: "7px" }} />
                </div>
                    <ModifyMusic show={showModifySong} handleClose={modifySongCloseHandler}/>
                <div style={{
                    border: "1px solid black", width: "100%", height: "46px", boxSizing: "border-box",
                    fontWeight: "bolder", display: "flex", justifyContent: "center", alignItems: "center",
                    borderBottomLeftRadius: "7px", borderBottomRightRadius: "7px"
                }}>
                    <p style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: "60%" }}>{Song.songTitle}</p>
                </div>
            </div>
        ))}
        <div style={{ display: "flex", justifyContent: "center", width: "100%", flexShrink: "0" }}>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    </div>
    
    )
}


export default MyPageSong;