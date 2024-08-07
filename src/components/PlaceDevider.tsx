
const PlaceDevider = () => {

    const placeItemStyle = {flexGrow:"1", fontFamily:"sans-serif", border:"4px solid #770ABF",
        fontStyle:"italic", fontWeight:"bolder", fontSize:"35px", borderRadius:"10px"};

    return (
        <div className='place-devider' style={{height:"74px", lineHeight:"67px", display:"flex", backgroundColor:"#1C003B"}}>
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