import { useEffect, useState, CSSProperties } from "react";
import { Props } from "../type/SongType";
import Player from "../components/PlayBar";
import { useDispatch, useSelector } from "react-redux";
import { setPlaySong, setSongList } from "../features/songSlice";
import { RootState } from "../store/store";
import SongItem from "../components/SongItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useSearchSong from "../hook/useSearchSong";

function SearchList() {

    // 스타일
    const searchListFontStyle: CSSProperties = { fontFamily: "Inter", fontStyle: "normal", fontSize: "20px", fontWeight: "700", lineHeight: "24px", color: "#000000" };
    //--
    const search = useSelector((state: RootState) => state.search);
    const song = useSelector((state: RootState) => state.song);
    const dispatch = useDispatch();

    //선택한 요소
    const [activeSongNo, setActiveSongNo] = useState<number | null>(null);
    const navi = useNavigate();
    const searchSong = useSearchSong;

    useEffect(() => {
        if (activeSongNo !== null) {
            dispatch(setPlaySong(activeSongNo));
        }
    }, [activeSongNo])

    const props: Props = {
        activeSongNo,
        setActiveSongNo,
        song,
        searchSong
    }

    const initTitle = '최신 등록 Top 20';
    const [searchTitle, setSearchTitle] = useState<string>(initTitle); 

    useEffect(()=>{

        let title = ''
        //1. 장르 있는 경우 
        if(search.genre > 0) {
            let genreTitle = song.genreList.find((elemet =>  elemet.genreNo == search.genre))?.genreName;
            title += genreTitle+" ";
        }

        //2. 분위기 있는 경우
        if(search.mood > 0) {
            let moodTitle = song.moodList.find((element => element.moodNo == search.mood))?.moodName;
            title += moodTitle+" ";
        }  

        //3. 키워드 있는 경우 
        if(search.keyword && search.keyword !== null) {
            let keywordTitle = search.keyword;
            title += keywordTitle
        }

        setSearchTitle(title ? title + " 로 검색한 결과 입니다." : '');
        
    },[song.list, search])



    return (
        <>
            <div className='search-list-title' style={{ height: "70px", padding: "0 10%", width: "80%" }}>
                <p style={{ ...searchListFontStyle, fontSize: "24px", paddingTop:"20px"}}>
                    {searchTitle}
                </p>
            </div>
            <div className='search-list-content' style={{ padding: "0 10%", width: "80%" }}>
                {song.list.length > 0 ?
                    (<SongItem {...props} />)
                    : (
                        <>
                            <div className='search-list-non' style={{ width: "100%", height: "60vh", display: "flex", alignContent: "center", justifyContent: "center" }}>
                                <p style={{ ...searchListFontStyle, fontSize: "22px" }}> 검색 결과가 없습니다. </p>
                            </div>
                        </>
                    )}
            </div>
            <Player {...props} />

        </>
    );
}

export default SearchList;