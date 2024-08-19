import { CSSProperties, MouseEvent, useEffect, useState } from "react";
import {Genre} from "../type/SongType";
import MoodSearch from "./MoodSearch";
import { useDispatch } from "react-redux";
import { setGenre, setKeyword } from "../features/searchSlice";

function GenreSearch ({searchGenre, searchMood}:{searchGenre:number, searchMood:number}){
  
  //스타일
  const genreItemFontStyle:CSSProperties = {fontFamily:"Inter", fontStyle:"normal", fontSize:"20px", fontWeight:"700", color:"#000000"};
  const genreCommonStyle:CSSProperties = {display: "flex", justifyContent: "center", alignItems:"center", boxSizing: "border-box",
    width: "130px", height:"40px", marginRight:"10px", borderRadius: "10px", background:"#FFFFFF"}
  const genreItemStyle:CSSProperties = {...genreCommonStyle, background:"#BA9FCC", color:"#FFFFFF"}
  
  const genre:Genre = {genreNo : 0 , genreName: '장르1'};
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

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseOver = () => {
    setIsHovered(true);
  }
  const handleMouseOut = () => {
    setIsHovered(false);
  }

  const dispatch = useDispatch();

  useEffect(()=>{
     //db에 저장된 장르 검색하여 state에 저장 후 결과 출력


  },[]);

  const [searchGenreNo, setSearchGenreNo] = useState(searchGenre);

    return(
      <>
        <div className='search-genre' 
          onMouseOut={handleMouseOut}
          style={{...genreCommonStyle, boxSizing: "border-box", width:"100%", height:"65px", background:"#1C003B"}} >
          {/* <div className='genre' style={{...genreCommonStyle, ...genreItemStyle, boxSizing: "border-box", background:"#BA9FCC"}}>
            <span style={{...genreItemFontStyle, color:"#FFFFFF"}} >모든 장르</span>
          </div> */}
              {/* 여기서 부터 select 결과 출력 */}
          {
            genres.map( genre => (
            <div className='genre'
                key={genre.genreNo}
                onMouseOver={handleMouseOver}
                onClick={()=>setSearchGenreNo(genre.genreNo)}
                style={searchGenreNo === genre.genreNo ? genreItemStyle : genreCommonStyle}>
              <span style={searchGenreNo === genre.genreNo ? {...genreItemFontStyle, color:"#FFFFFF"} : genreItemFontStyle}>{genre.genreName}</span>
            </div>
            ))  
          } 
        </div>
        {isHovered && <MoodSearch handleMouseOver={handleMouseOver} handleMouseOut={handleMouseOut} searchGenreNo={searchGenreNo}/>}
    </>
       
    );
}

export default GenreSearch;