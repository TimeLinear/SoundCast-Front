
import { useState } from "react";
import Item from "../type/items";

function SearchList(){

    // 스타일
    const searchListBoxStyle = {width: "100%", height: "80px", display: "flex", alignItems : "center", justifyContent: "space-evenly", 
                                borderRadius: "10px", background: "#1C003B", borderBottom: "1px solid #FFFFFF"};
    const searchListFontStyle = {fontFamily:"Inter", fontStyle:"normal", fontSize:"20px", fontWeight:"700", lineHeight:"24px", color :"#000000"};
    const itemBoxStyle = {display: "flex", alignItems: "center", justifyContent: "center", width: "120px", height: "38px", background: "#FFFFFF", borderRadius: "10px"};
    const iconBoxSizeStyle = { height: "35px", width: "35px"};

    const testItems: Item[] = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
        { id: 4, name: 'Item 4' },
        { id: 5, name: 'Item 4' },
        { id: 6, name: 'Item 4' },
        { id: 7, name: 'Item 4' },
        { id: 8, name: 'Item 4' },
        { id: 9, name: 'Item 4' },
        { id: 10, name: 'Item 4' },
        { id: 11, name: 'Item 4' },
        { id: 12, name: 'Item 4' },
        { id: 13, name: 'Item 4' },
        { id: 14, name: 'Item 4' },
        { id: 15, name: 'Item 4' },
        { id: 16, name: 'Item 4' },
        { id: 17, name: 'Item 5' }
      ];
    
    //선택한 요소
    const [activeItemNo, setActiveItemNo] = useState<number | null>(null);

    const handleIconClick = (id: number) => {
        setActiveItemNo(id === activeItemNo ? null : id);
    };




    return (
        <>
            <div className='search-list-title' style={{height: "50px", padding:"0 10%", width:"80%"}}>
                <p style={{...searchListFontStyle, fontSize:"24px"}}>다운로드 TOP 20</p>
            </div>
            <div className='search-list-content' style={{padding : "0 10%", width: "80%"}}>
                
                {

                testItems.map( Item => (
                //검색결과를 플레이리스트로 반환 (반복)
               
                <div className='search-list' key={Item.id} style={{...searchListBoxStyle}}>
            
                    <div className='play-icon' style={{...iconBoxSizeStyle}} >
                        <img src={Item.id === activeItemNo ? "images/pause-button-icon-white.png" : "images/play-icon.png"} 
                            style={{height:"100%", width:"100%"}}
                            onClick={()=>handleIconClick(Item.id)}/>
                    </div>
                    {/* 이미지 있는 경우 해당 이미지 보여주기, 없는 경우 default image */}
                    <div className='song-image' style={{width:"50px", height:"50px"}}>
                        <img src='images/song-image.png' style={{height:"100%", width:"100%"}}/>
                    </div>
                    <div className='song-content' style={{width:"300px", height:"50px"}}>
                        <div className='song-title' style={{height:"50%"}}>
                            <span style={{...searchListFontStyle, color:"#FFFFFF"}}>Time is Eating</span>
                        </div>
                        <div className='artist-name' style={{height:"50%"}}>
                            <span style={{...searchListFontStyle, fontSize:"15px", lineHeight:"18px", color:"#FFFFFF"}}>아티스트명</span>
                        </div> 
                    </div>

                    {/* 재생중일 때 나타나는 헤드폰 아이콘 */}
                    <div className='headphone-icon' style={{...iconBoxSizeStyle}}>
                        {activeItemNo === Item.id && (<img src="images/headphone-icon.png" style={{height:"100%", width:"100%"}}/>)}
                    </div>

                    <div className='genre-box' style={{...itemBoxStyle}}>
                        <span style={{...searchListFontStyle}}>장르</span>
                    </div>
                    <div className='mood-box' style={{...itemBoxStyle}}>
                        <span style={{...searchListFontStyle}}>분위기</span>
                    </div>
                    
                    {/* 라이센스가 있을 경우 나타나는 아이콘 */}
                    <div className='license-icon' style={{...iconBoxSizeStyle}}>
                        <img src='images/license-icon.png' style={{height:"100%", width:"100%"}}/>
                    </div>
                    
                    <div className='play-time-box' style={{display:"flex", alignItems:"center", height: "38px"}}>
                        <div className='clock-icon' style={{...iconBoxSizeStyle, paddingRight:"7px"}}>
                            <img src='images/clock-icon.png' style={{height:"100%", width:"100%"}}/>
                        </div>
                        <div className='play-time'>
                            <span style={{...searchListFontStyle, color:"#FFFFFF"}}>1:58</span>
                        </div>
                    </div>

                    <div className='download-box' style={{...itemBoxStyle}}>
                        <span style={{...searchListFontStyle}}>다운로드</span>
                    </div>

                    <div className='share-icon' style={{...iconBoxSizeStyle}}>
                        <img src='images/share-icon.png' style={{height:"100%", width:"100%"}}/>
                    </div>
                    <div className='open-icon' style={{...iconBoxSizeStyle}}>
                        <img src="images/open-icon.png" style={{height:"100%", width:"100%"}}/>
                    </div>


                </div>
                ) )
            }
            </div>

        </>
    );
}

export default SearchList;