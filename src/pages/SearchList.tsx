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
    //--
    const search = useSelector((state:RootState)=>state.search);
    const dispatch = useDispatch();
    const songs = initSongList;    

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
        songs
    }
    
    useEffect(()=>{
        
        // if(search.genre > 0){
        //     genreName = '장르명';
        // }
        // if(search.mood > 0){
        //     const moodName = '분위기명';
        // }
        // if(search.keyword != ''){
        //     const keyword = search.keyword; 
        // }
        // const context = genreName + " - "+ mood + " - "+ keyword;




    },[search.genre, search.mood, search.keyword])

    return (
        <>
            <div className='search-list-title' style={{height: "50px", padding:"0 10%", width:"80%"}}>
                <p style={{...searchListFontStyle, fontSize:"24px"}}>
                    { search !== null ? (
                        search.genre && search.mood && search.keyword ? (search.genre+" - "+search.mood+" - "+search.keyword+ " 로 검색한 결과 입니다.") : (search.mood ? (search.mood) : "" )
                    ) : "다운로드 Top 20"}
                </p>
            </div>
            <div className='search-list-content' style={{padding : "0 10%", width: "80%"}}>
                <SongItem {...props}/>
            </div>
                <Player {...props} />
                    
        </>
    );
}

export default SearchList;