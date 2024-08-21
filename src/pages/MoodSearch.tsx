import { Mood } from "../type/SongType";

function MoodSearch(props:{ handleMouseOver: () => void; handleMouseOut: () => void; }){

    const {handleMouseOver, handleMouseOut} = props

    const moodItemFontStyle = {fontFamily:"Inter", fontStyle:"normal", fontSize:"16px", lineHeight: "19px", fontWeight:"700", color:"#000000"};
    const moodCommonStyle = {display: "flex", justifyContent: "center", alignItems:"center"};
    const moodItemStyle = {width: "130px", height:"40px", marginRight:"10px"}
  
    const moods:Mood[] = [
      {moodNo : 1 , moodName: '분위기1'},
      {moodNo : 2 , moodName: '분위기2'},
      {moodNo : 3 , moodName: '분위기3'},
      {moodNo : 4 , moodName: '분위기4'},
      {moodNo : 5 , moodName: '분위기5'},
      {moodNo : 6 , moodName: '분위기6'}   
    ];
  
    return (
      <div className="search-mood" 
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{...moodCommonStyle, position : "absolute", zIndex: 10, boxSizing: "border-box", width:"100%", height:"75px", background: "rgba(217, 217, 217, 0.8)"}}>
        
        <div className='mood' style={{...moodCommonStyle, ...moodItemStyle, boxSizing: "border-box"}}>
          <span style={{...moodItemFontStyle ,color:"#FFFFFF"}} >모든 장르</span>
        </div>
        {/* 여기서 부터 select 결과 출력 */}
        {
          moods.map( mood => (
            <div className='genre' style={{...moodCommonStyle, ...moodItemStyle, boxSizing: "border-box"}}>
              <span style={{...moodItemFontStyle}}>{mood.moodName}</span>
            </div>
          ))  
        }
      </div>
  
    );
  }
  

export default MoodSearch;
  
  