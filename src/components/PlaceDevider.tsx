
const PlaceDevider = () => {

    const placeItemFont = {flexGrow:"1", fontFamily:"sans-serif", color:"white",
        fontStyle:"italic", fontWeight:"bolder", fontSize:"40px"};

    return (
        <div className='place-devider' style={{height:"74px", lineHeight:"74px", display:"flex", backgroundColor:"#1C003B"}}>
            <div style={{...placeItemFont, borderRadius:""}}>
                Official Place
            </div>
            <div style={placeItemFont}>
                Unofficial Place
            </div>
        </div>
    );
}

export default PlaceDevider;