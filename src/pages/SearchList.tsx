import { useEffect, useState, CSSProperties } from "react";
import { Props } from "../type/SongType";
import Player from "../components/PlayBar";
import { useDispatch, useSelector } from "react-redux";
import { setPlaySong, setSongList } from "../features/songSlice";
import { RootState } from "../store/store";
import SongItem from "../components/SongItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

    const searchSong = () => {
        axios.get(`http://localhost:8087/soundcast/song/search`, { params: search })
            .then((response) => {
                //키워드로 db에 저장된 노래 불러와 리스트 전역에 저장
                console.log(response.data);
                dispatch(setSongList(response.data));
            })
            .catch((err) => console.log(err))
        navi("/search");
    }

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

    useEffect(() => {
        axios.get(`http://localhost:8087/soundcast/song/search`, { params: search })
            .then((response) => {
                //키워드로 db에 저장된 노래 불러와 리스트 전역에 저장
                console.log(response.data);
                dispatch(setSongList(response.data));
            })
            .catch((err) => console.log(err))

    }, [search.placeNo])




    return (
        <>
            <div className='search-list-title' style={{ height: "50px", padding: "0 10%", width: "80%" }}>
                <p style={{ ...searchListFontStyle, fontSize: "24px" }}>
                    {0 ? "다운로드 Top 20" : (
                        (search.genre === 0 ? "" : search.genre + " - ") && (search.mood === 0 ? "" : search.mood + " - ") && (search.keyword === "" ? "" : search.keyword) && (" 로 검색한 결과입니다.")
                        // search.genre && search.mood && search.keyword ? (search.genre+" - "+search.mood+" - "+search.keyword+ " 로 검색한 결과 입니다.") : 
                    )}
                </p>
            </div>
            <div className='search-list-content' style={{ padding: "0 10%", width: "80%" }}>
                {song.list.length > 0 ?
                    (<SongItem {...props} />)
                    : (
                        <>
                            <div className='search-list-non' style={{ width: "100%", height: "80vw", display: "flex", alignContent: "center", justifyContent: "center" }}>
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