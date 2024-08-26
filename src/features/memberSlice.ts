import { createSlice } from "@reduxjs/toolkit";
import { Followings, FollowList, Member } from "../type/memberType";
import { removeCookie, setCookie } from "../utils/Cookie";


const followingInit:Followings={
    nickName: '',
    profile:''
}

const followInit:FollowList={
    follower : 0,
    following : [followingInit]

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
                memberNo:data.memberNo,
                profile:data.profileImage.profileImagePath,
                nickName:data.memberNickname,
                email:data.memberEmail,
                banner:data.memberBanner.memberBannerPath,
                introduce:data.memberIntroduce,
                follow:{
                    follower:data.follower,
                    following:data.followings?.map((following:any) => ({
                        nickName:following.following.nickName,
                        profile:following.following.profileImagePath
                    })) || []
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