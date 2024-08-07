import Item from "../type/items";

function GenreSearch (){
  
  //스타일
  const genreItemFontStyle = {fontFamily:"Inter", fontStyle:"normal", fontSize:"20px", fontWeight:"700", color:"#000000"};
  const genreCommonStyle = {display: "flex", justifyContent: "center", alignItems:"center"}
  const genreItemStyle = {width: "130px", height:"40px", marginRight:"10px", borderRadius: "10px", background:"#FFFFFF"}
  
  //db에 저장된 장르 검색하여 state에 저장 후 결과 출력

  const items: Item[] = [
    { id: 1, name: '장르 1' },
    { id: 2, name: '장르 2' },
    { id: 3, name: '장르 3' },
    { id: 4, name: '장르 4' },
    { id: 5, name: '장르 5' },
    { id: 6, name: '장르 6' },
    { id: 7, name: '장르 7' },
    { id: 8, name: '장르 8' },
    { id: 9, name: '장르 9' },
    { id: 10, name: '장르 10' },
  ];

    return(
        <div className='search-genre' style={{...genreCommonStyle, boxSizing: "border-box", width:"100%", height:"65px", background:"#1C003B"}} >
              <div className='genre' style={{...genreCommonStyle, ...genreItemStyle, boxSizing: "border-box", background:"#BA9FCC"}}>
                <span style={{...genreItemFontStyle ,color:"#FFFFFF"}} >모든 장르</span>
              </div>
              {/* 여기서 부터 select 결과 출력 */}
              {
                items.map( Item => (
                <div className='genre' style={{...genreCommonStyle, ...genreItemStyle, boxSizing: "border-box"}}>
                  <span style={{...genreItemFontStyle}}>{Item.name}</span>
                </div>
                ))  
              } 
        </div>
    );
}
export default GenreSearch;