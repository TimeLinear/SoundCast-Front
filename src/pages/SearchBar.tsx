function SearchBar(){
  
  const searchBarStyle = {display: "flex", justifyContent: "center", alignItems:"center", width:"100%", height:"65px", background:"#1C003B"};
  const searchBarBodyStyle = {display: "flex", justifyContent: "space-evenly", alignItems:"center", width:"60%", height:"70%", background:"#FFFFFF", borderRadius:"20px"}
  const searchBarFontStyle = {fontFamily:"Inter", fontStyle:"normal", fontSize:"20px", fontWeight:"700"};


    return(
        <div className='search-bar' style={{...searchBarStyle, boxSizing:"border-box"}}>
          <div className='search-bar-body' style={{...searchBarBodyStyle, boxSizing:"border-box"}}>
            <div className='search-icon-box' style={{height: "35px"}}>
              <img src='images/search-icon.png' />
            </div>
            <div className='search-bar-input' style={{width:"85%", height:"90%"}}>
              <input style={{...searchBarFontStyle, border:"0", width:"100%", height:"90%"}} placeholder='Sound CAST의 장르별 음원 검색' />
            </div>
          </div>
        </div>
    );
}
export default SearchBar;