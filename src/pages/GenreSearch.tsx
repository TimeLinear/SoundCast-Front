import { CSSProperties, MouseEvent, useEffect, useState } from "react";
import {Genre} from "../type/SongType";
import MoodSearch from "./MoodSearch";
import { useDispatch } from "react-redux";
import { setGenre, setKeyword } from "../features/searchSlice";


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
  
  // const genre:Genre = {genreNo : 0 , genreName: '장르1'};
  const genres:Genre[] = [
    {genreNo : 0 , genreName: '모든 장르'},
    {genreNo : 1 , genreName: '장르1'},
    {genreNo : 2 , genreName: '장르2'},
    {genreNo : 3 , genreName: '장르3'},
    {genreNo : 4 , genreName: '장르4'},
    {genreNo : 5 , genreName: '장르5'},
    {genreNo : 6 , genreName: '장르6'},
    {genreNo : 7 , genreName: '장르7'},
    {genreNo : 8 , genreName: '장르8'},
    {genreNo : 9 , genreName: '장르9'},
    {genreNo : 10 , genreName: '장르10'}
  ];

  const dispatch = useDispatch();

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

  useEffect(()=>{
    //db에 저장된 장르 검색하여 state에 저장 후 결과 출력

  },[]);

  const [searchGenreNo, setSearchGenreNo] = useState(-1);

  

  const props:SearchProps = {
    handleMouseOver,
    handleMouseOut,
    onLeaveSearchs,
    searchGenreNo
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