import { CSSProperties } from "react";

const PlaceDevider = () => {

    const placeItemStyle:CSSProperties = {flexGrow:"1", fontFamily:"sans-serif", border:"4px solid #770ABF", height:"64px", font:"italic bolder 35px Inter",
        borderRadius:"10px", minWidth:"300px", display:"flex", alignItems:"center", justifyContent:"center", flexBasis:"640px", boxSizing:"border-box"};

    return (
        <div className='place-devider' style={{height:"64px", display:"flex", backgroundColor:"#1C003B", minWidth:"1280px", boxSizing:"border-box", alignItems:"center"}}>
            <div style={{...placeItemStyle, color:"white"}}>
                Official Place
            </div>
            <div style={{...placeItemStyle, backgroundColor:"white", color:"black"}}>
                Unofficial Place
            </div>
        </div>
    );
}

export default PlaceDevider;