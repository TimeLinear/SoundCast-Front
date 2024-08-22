import { CSSProperties, MouseEvent, useEffect, useState } from "react";
import {Genre, initGenres} from "../type/SongType";
import MoodSearch from "./MoodSearch";
import { useDispatch } from "react-redux";
import { setGenre, setKeyword } from "../features/searchSlice";
import axios from "axios";


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

  const [genres, setGenres] = useState<Genre[]>(initGenres);
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

  const props:SearchProps = {
    handleMouseOver,
    handleMouseOut,
    onLeaveSearchs,
    searchGenreNo
  }
  
   //------------수정한 부분(08/21)
   useEffect(()=>{
    axios.get("http://localhost:8087/soundcast/song/genres")
    .then((response) => setGenres(response.data))
    .catch((err) => console.log(err))

  },[]);
  //--------------------------
 

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
          genres.map( genre => (
          <div id='genre'
              key={genre.genreNo}
              onMouseEnter={()=>setSearchGenreNo(genre.genreNo)}
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