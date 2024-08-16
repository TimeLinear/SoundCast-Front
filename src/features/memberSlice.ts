import { createSlice } from "@reduxjs/toolkit";
import { Member } from "../type/memberType";
import { removeCookie, setCookie } from "../utils/Cookie";



const initialState:Member= {
    profile : '',
    nickName : '',
    email: '',
    banner: '',
    introduce: '',
    follow: 0
}



let memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers:{
        login : (state, action) =>{
            const member = action.payload;
            console.log(member)
            return {
                profile:member.profileImage.profileImagePath,
                nickName:member.memberNickname,
                email:member.memberEmail,
                banner:member.memberBanner.memberBannerPath,
                introduce:member.memberIntroduce,
                follow:member.follwer
                
            }

           
        },
        logout : (state) =>{
            removeCookie('accessToken');
            
            return initialState;

        }
    }
})

export const{login,logout} = memberSlice.actions;
export default memberSlice.reducer;