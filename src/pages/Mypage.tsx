import { useState } from "react";
import ModifyMusic from "./ModifyMusic";
import UploadMusic from "./UploadMusic";

const Mypage = () => {
    const[showModifyMusicModal, setModifyMusicModal] = useState(false);
    const openModifyMusic = () => setModifyMusicModal(true); 
    const closeModifyMusic = () => setModifyMusicModal(false);

    const[showUploadMusicModal, setUploadMusicModal] = useState(false);
    const openUploadMusic = () => setUploadMusicModal(true);
    const closeUploadMusic = () =>setUploadMusicModal(false);


    return(
        <>
        <div>
            <button onClick={openModifyMusic}>음악수정하기</button>
        </div>
        <div>
            <button onClick={openUploadMusic}>음악 업로드하기</button>
        </div>
        
        <ModifyMusic show={showModifyMusicModal} handleClose={closeModifyMusic}/>
        <UploadMusic show={showUploadMusicModal} handleClose={closeUploadMusic}/>
        </>
    );



        
}
export default Mypage;