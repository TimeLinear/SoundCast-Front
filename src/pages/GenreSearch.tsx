import { CSSProperties, MouseEvent, useEffect, useState } from "react";
import {Genre, initGenres} from "../type/SongType";
import MoodSearch from "./MoodSearch";
import { useDispatch, useSelector } from "react-redux";
import { setGenre, setKeyword, setMood } from "../features/searchSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { setGenreList, setSongList } from "../features/songSlice";


export interface SearchProps {
  handleMouseOver: (e:MouseEvent) => void,
  handleMouseOut: (e:MouseEvent) => void,
  onLeaveSearchs: () => void,
  searchGenreNo: number,
  searchSongs: ()=>void
}

function GenreSearch ({searchGenre, searchMood}:{searchGenre:number, searchMood:number}){
  
  //스타일
  const genreItemFontStyle:CSSProperties = {fontFamily:"Inter", fontStyle:"normal", fontSize:"20px", fontWeight:"700", color:"#000000"};
  const genreCommonStyle:CSSProperties = {display: "flex", justifyContent: "center", alignItems:"center", boxSizing: "border-box",
    width: "130px", height:"40px", marginRight:"10px", background:"#FFFFFF", borderRadius: "10px"}
  const genreItemStyle:CSSProperties = {...genreCommonStyle, background:"#BA9FCC", color:"#FFFFFF"}
  
  const dispatch = useDispatch();
  const navi = useNavigate();
  const search = useSelector((state:RootState) => state.search);
  const song = useSelector((state:RootState) => state.song);
  // const [genres, setGenres] = useState<Genre[]>(initGenres);

  const [searchGenreNo, setSearchGenreNo] = useState(-1);

  const [isHovered, setIsHovered] = useState({genreDiv:false, moodDiv:false});
  const handleMouseOver = (e:MouseEvent) => {
    if((e.target as HTMLDivElement).id.includes("genre")) {
      setIsHovered((prev) => ({...prev, genreDiv:true}))
    } else if((e.target as HTMLDivElement).id.includes("mood")) {
      setIsHovered((prev) => ({...prev, moodDiv:true}))
    }
  }
  const handleMouseOut = (e:MouseEvent) => {
    if((e.target as HTMLDivElement).id.includes("genre")) {
      setIsHovered((prev) => ({...prev, genreDiv:false}));
    } else if((e.target as HTMLDivElement).id.includes("mood")) {
      setIsHovered((prev) => ({...prev, moodDiv:false}))
    }
  }

  const onLeaveSearchs = () => {
    if(isHovered.genreDiv === false && isHovered.moodDiv === false) {
      setSearchGenreNo((prev) => (-1));
    }
  }

  useEffect(()=>{
    onLeaveSearchs();
  },[isHovered]);

  
   //------------수정한 부분(08/21)
   useEffect(()=>{
    axios.get("http://localhost:8087/soundcast/song/genres")
    .then((response) => dispatch(setGenreList(response.data)))
    .catch((err) => console.log(err))
  },[]);
  
  useEffect(()=>{
    dispatch(setGenre(searchGenreNo));
  },[searchGenreNo])
 
  const searchSongs = () => {
    console.log(search.genre)
    axios.get(`http://localhost:8087/soundcast/song/search`, 
      {params : {...search, genre:searchGenreNo} })
      .then((response) => {
          //키워드로 db에 저장된 노래 불러와 리스트 전역에 저장
          console.log(response.data);
          dispatch(setSongList(response.data));
        })
      .catch((err)=>console.log(err));

    navi("/search");
  }
  //--------------------------  
   
  const props:SearchProps = {
    handleMouseOver,
    handleMouseOut,
    onLeaveSearchs,
    searchGenreNo,
    searchSongs
  }
  
  return(
    <>
      <div id='search-genre'
        onMouseEnter={handleMouseOver}
        onMouseLeave={(e) => {handleMouseOut(e); onLeaveSearchs();}}
        style={{...genreCommonStyle, boxSizing: "border-box", width:"100%", height:"65px", background:"#1C003B", borderRadius: "0"}} >
        {/* <div className='genre' style={{...genreCommonStyle, ...genreItemStyle, boxSizing: "border-box", background:"#BA9FCC"}}>
          <span style={{...genreItemFontStyle, color:"#FFFFFF"}} >모든 장르</span>
        </div> */}
            {/* 여기서 부터 select 결과 출력 */}
        {
          song.genreList.map( genre => (
          <div id='genre'
              key={genre.genreNo}
              onMouseEnter={()=>{console.log(genre.genreNo); setSearchGenreNo(genre.genreNo)}}
              onClick={searchSongs}
              style={searchGenreNo === genre.genreNo ? genreItemStyle : genreCommonStyle}>
            <span style={searchGenreNo === genre.genreNo ? {...genreItemFontStyle, color:"#FFFFFF"} : genreItemFontStyle}>{genre.genreName}</span>
          </div>
          ))  
        } 
      </div>
      {(isHovered.genreDiv === true || isHovered.moodDiv === true) && <MoodSearch {...props}/>}
  </>
      
  );
}

export default GenreSearch;