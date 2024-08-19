import { CSSProperties, MouseEvent, useState } from "react";
import { Mood } from "../type/SongType";

function MoodSearch(props:{ handleMouseOver: () => void; handleMouseOut: () => void; searchGenreNo:number }){

    const {handleMouseOver, handleMouseOut} = props

    const moodItemFontStyle:CSSProperties = {fontFamily:"Inter", fontStyle:"normal", fontSize:"16px", lineHeight: "19px", fontWeight:"700", color:"#000000"};
    const moodCommonStyle:CSSProperties = {display: "flex", justifyContent: "center", alignItems:"center", width: "130px", height:"40px", marginRight:"10px", boxSizing: "border-box"};
  
    const moods:Mood[] = [
      {moodNo : 0 , moodName: '모든 분위기'},
      {moodNo : 1 , moodName: '분위기1'},
      {moodNo : 2 , moodName: '분위기2'},
      {moodNo : 3 , moodName: '분위기3'},
      {moodNo : 4 , moodName: '분위기4'},
      {moodNo : 5 , moodName: '분위기5'},
      {moodNo : 6 , moodName: '분위기6'}   
    ];

    const [searchMoodNo, setSearchMoodNo] = useState<number>(-1);

    const onHoverMood = (e:MouseEvent, moodNo:number) => {
      console.log("마우스 Hover 이벤트");
      e.stopPropagation();
      setSearchMoodNo(moodNo);
    }

    const onLeaveMood = (e:MouseEvent) => {
      e.stopPropagation();
      setSearchMoodNo(-1);
    }
  
    return (
      <div className="search-mood" 
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{...moodCommonStyle, position : "absolute", zIndex: 10, boxSizing: "border-box", width:"100%", height:"75px", background: "rgba(217, 217, 217, 0.8)"}}>
        
        {/* <div className='mood' style={{...moodCommonStyle}}>
          <span style={{...moodItemFontStyle ,color:"#FFFFFF"}} >모든 분위기</span>
        </div> */}
        {/* 여기서 부터 select 결과 출력 */}
        {
          moods.map( mood => (
            <div className='mood' style={{...moodCommonStyle}} onMouseOver={(e) => onHoverMood(e, mood.moodNo)} onMouseLeave={(e) => onLeaveMood(e)}>
              <span style={searchMoodNo === mood.moodNo ? {...moodItemFontStyle, color:"#FFFFFF"} : moodItemFontStyle}>{mood.moodName}</span>
            </div>
          ))  
        }
      </div>
  
    );
  }
  

export default MoodSearch;
  
  