import { CSSProperties, MouseEvent, useEffect, useState } from "react";
import { SearchProps } from "./GenreSearch";
import { useDispatch, useSelector } from "react-redux";
import { setMood } from "../features/searchSlice";
import { RootState } from "../store/store";

function MoodSearch(props:SearchProps){

    const {handleMouseOver, handleMouseOut, searchGenreNo, onLeaveSearchs, searchSongs} = props

    const moodItemFontStyle:CSSProperties = {fontFamily:"Inter", fontStyle:"normal", fontSize:"16px", lineHeight: "19px", fontWeight:"700", color:"#000000"};
    const moodCommonStyle:CSSProperties = {display: "flex", justifyContent: "center", alignItems:"center", width: "130px", height:"40px", marginRight:"10px", boxSizing: "border-box"};

    const dispatch = useDispatch();

    const song = useSelector((state:RootState) => state.song); 
    
    //--------------------------------
    const [searchMoodNo, setSearchMoodNo] = useState<number>(-1);

    const onHoverMood = (e:MouseEvent, moodNo:number) => {
      e.stopPropagation();
      setSearchMoodNo(moodNo);
    }

    const onLeaveMood = (e:MouseEvent) => {
      e.stopPropagation();
      setSearchMoodNo(-1);
    }

    useEffect(()=>{
      dispatch(setMood(searchMoodNo));
    },[searchMoodNo])
  
    return (
      <div id="search-mood" 
        onMouseEnter={handleMouseOver}
        onMouseLeave={(e) => {handleMouseOut(e); onLeaveSearchs();}}
        style={{...moodCommonStyle, position : "absolute", zIndex: 10, boxSizing: "border-box", width:"100%",
          height:"75px", background: "rgba(217, 217, 217, 0.8)"}}>
        
        {/* 여기서 부터 select 결과 출력 */}
        {
          song.moodList.map( mood => (
            <div id='mood' key={mood.moodNo}
              style={{...moodCommonStyle}} 
              onClick={searchSongs}
              onMouseEnter={(e) => {onHoverMood(e, mood.moodNo)}} onMouseLeave={(e) => onLeaveMood(e)}>
              <span style={searchMoodNo === mood.moodNo ? {...moodItemFontStyle, color:"#FFFFFF"} : moodItemFontStyle}>{mood.moodName}</span>
            </div>
          ))  
        }
      </div>
  
    );
  }
  

export default MoodSearch;
  
  