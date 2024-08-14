
const PlaceDevider = () => {

    const placeItemStyle = {flexGrow:"1", fontFamily:"sans-serif", border:"4px solid #770ABF", height:"64px", font:"italic bolder 35px Inter",
        borderRadius:"10px", minWidth:"300px", display:"flex", alignItems:"center", justifyContent:"center"};

    return (
        <div className='place-devider' style={{height:"64px", display:"flex", backgroundColor:"#1C003B", width:"100vw", boxSizing:"border-box", alignItems:"center"}}>
            <div style={{...placeItemStyle, color:"white", flexBasis:"512px", boxSizing:"border-box"}}>
                Official Place
            </div>
            <div style={{...placeItemStyle, backgroundColor:"white", color:"black", flexBasis:"512px", boxSizing:"border-box"}}>
                Unofficial Place
            </div>
        </div>
    );
}

export default PlaceDevider;