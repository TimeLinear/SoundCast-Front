import { createSlice } from "@reduxjs/toolkit";
import { FollowList, Member } from "../type/memberType";
import { removeCookie, setCookie } from "../utils/Cookie";


const followInit:FollowList={
    follower : 0,
    following : []

}

const initialState:Member= {
    memberNo: 0,
    profile : '',
    nickName : '',
    email: '',
    banner: '',
    introduce: '',
    follow: followInit
}





let memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers:{
        login : (state, action) =>{
            const data = action.payload;
            console.log(data);
            return {
                memberNo:data.member.memberNo,
                profile:data.member.profileImage.profileImagePath,
                nickName:data.member.memberNickname,
                email:data.member.memberEmail,
                banner:data.member.memberBanner.memberBannerPath,
                introduce:data.member.memberIntroduce,
                follow:{
                    follower:data.member.follower,
                    following:data.member.following
                }
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
export {initialState};
export {followInit};