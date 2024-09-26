import { CSSProperties, MouseEvent, useEffect, useState } from "react";
import MoodSearch from "./MoodSearch";
import { useDispatch, useSelector } from "react-redux";
import { setGenre, setKeyword, setMood } from "../features/searchSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import useSearchSong from "../hook/useSearchSong";


export interface SearchProps {
  handleMouseOver: (e:MouseEvent) => void,
  handleMouseOut: (e:MouseEvent) => void,
  onLeaveSearchs: () => void,
  searchGenreNo: number
}

function GenreSearch ({searchGenre, searchMood}:{searchGenre:number, searchMood:number}){
  
  //스타일
  const genreItemFontStyle:CSSProperties = {fontFamily:"Inter", fontStyle:"normal", fontSize:"20px", fontWeight:"700", color:"#000000"};
  const genreCommonStyle:CSSProperties = {display: "flex", justifyContent: "center", alignItems:"center", boxSizing: "border-box",
    width: "130px", height:"40px", marginRight:"10px", background:"#FFFFFF", borderRadius: "10px"}
  const genreItemStyle:CSSProperties = {...genreCommonStyle, background:"#BA9FCC", color:"#FFFFFF"}
  
  const dispatch = useDispatch();
  const navi = useNavigate();
  
  const song = useSelector((state:RootState) => state.song);
  const search = useSelector((state:RootState) => state.search);
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

  // useEffect(()=>{
  //   dispatch(setGenre(searchGenreNo));
  // },[searchGenreNo])
  
  //검색함수 수정 (24-09-11)
  const searchSongs = useSearchSong();
  //--------------------------  
   
  const props:SearchProps = {
    handleMouseOver,
    handleMouseOut,
    onLeaveSearchs,
    searchGenreNo
  }

  const onClickGenre = (genreNo:number) => {
    dispatch(setKeyword(""));
    dispatch(setGenre(genreNo));
    dispatch(setMood(0));
    navi("/search");
  }

  
  return(
    <>
      <div id='search-genre'
        // onMouseEnter={handleMouseOver}
        onMouseLeave={(e) => {handleMouseOut(e); onLeaveSearchs();}}
        style={{...genreCommonStyle, boxSizing: "border-box", width:"100%", height:"65px", background:"#1C003B", borderRadius: "0"}} >
            {/* 여기서 부터 select 결과 출력 */}
        {
          song.genreList.map( genre => (
          <div id='genre'
              key={genre.genreNo}
              onMouseEnter={(e)=>{setSearchGenreNo(genre.genreNo); handleMouseOver(e);}}
              onClick={()=>{onClickGenre(genre.genreNo);}}
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