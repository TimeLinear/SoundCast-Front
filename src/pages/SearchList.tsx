import { useEffect, useState, CSSProperties } from "react";
import { initSongList, Song } from "../type/SongType";
import { Props } from "../type/SongType";
import Player from "../components/PlayBar";
import { useDispatch, useSelector } from "react-redux";
import { setPlaySong } from "../features/songSlice";
import { RootState } from "../store/store";
import SongItem from "../components/SongItem";

function SearchList(){

    // 스타일
    const searchListFontStyle:CSSProperties = { fontFamily: "Inter", fontStyle: "normal", fontSize: "20px", fontWeight: "700", lineHeight: "24px", color: "#000000" };
    const search = useSelector((state:RootState)=>state.search);
    const dispatch = useDispatch();
    const song = useSelector((state:RootState) => state.song);    

    //선택한 요소
    const [activeSongNo, setActiveSongNo] = useState<number|null>(null);

    useEffect(()=>{
        if(activeSongNo!==null){
            dispatch(setPlaySong(activeSongNo));
        }
    },[activeSongNo])
    
    const props:Props = {
        activeSongNo,
        setActiveSongNo,
        song
    }
   
    return (
        <>
            <div className='search-list-title' style={{height: "50px", padding:"0 10%", width:"80%"}}>
                <p style={{...searchListFontStyle, fontSize:"24px"}}>{!search.keyword ? "다운로드 Top 20" : search.keyword+" 로 검색한 결과입니다."}</p>
            </div>
            <div className='search-list-content' style={{padding : "0 10%", width: "80%"}}>
                <SongItem {...props}/>
            </div>
                <Player {...props} />
        </>
    );
}

export default SearchList;