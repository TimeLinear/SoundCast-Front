import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Comment, FollowList, Followings, Member } from "../type/memberType";
import { removeCookie, setCookie } from "../utils/Cookie";
import { stat } from "fs";



const commentInit: Comment = {
    commentNo: 0,
    writerNo: 0,
    content: '',
    writerInfo: {
        profile: '',
        nickName: ''
    }
}
const followingInit: Followings = {
    memberNo: 0,
    nickName: '',
    profile: ''

}

const followInit: FollowList = {
    follower: 0,
    following: [followingInit]

}
const initialState: Member = {
    memberNo: 0,
    profile: '',
    nickName: '',
    email: '',
    banner: '',
    introduce: '',
    follow: followInit,
    comment: [commentInit]
}





let memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        login: (state, action) => {
            const data = action.payload;
            console.log("헤더서 로그인해서 보낸 데이터");
            console.log(data);
            return {
                memberNo: data.memberNo,
                profile: data.profileImage.profileImagePath,
                nickName: data.memberNickname,
                email: data.memberEmail,
                banner: data.memberBanner.memberBannerPath,
                introduce: data.memberIntroduce,
                follow: {
                    follower: data.follower,
                    following: data.following?.map((following: { memberNo: number, memberNickname: string, profileImage: { profileImagePath: string } }) => ({
                        memberNo: following.memberNo,
                        nickName: following.memberNickname,
                        profile: following.profileImage.profileImagePath
                    })) || []
                },

                comment: data.commentList?.map((comment: any) => ({
                    commentNo: comment.comment.commentNo,
                    writerNo: comment.comment.commentWriterMemberNo,
                    content: comment.comment.commentText,
                    writerInfo: {
                        profile: comment.profileImage.profileImagePath,
                        nickName: comment.memberNickname
                    }
                })) || []
            }

        },
        logout: (state) => {
            removeCookie('accessToken');

            return initialState;

        },
        setComments(state, action: PayloadAction<Comment[]>) {
            state.comment = action.payload;
        },

        updateComments(state, action: PayloadAction<Comment[]>) {
            state.comment = action.payload;
        },
        addFollowing(state, action: PayloadAction<Followings>) {
            const newFollowing = action.payload;
            return {
                ...state, 
                follow:{
                    follower: state.follow.follower,
                    following: [...state.follow.following, 
                        { memberNo:newFollowing.memberNo, nickName:newFollowing.nickName, profile:newFollowing.profile}]
                }
            }
        },
        removeFollowing(state, action:PayloadAction<number>) {
            return {
                ...state,
                follow: {
                    follower: state.follow.follower,
                    following: [ ...(state.follow.following.filter((followingMember) => followingMember.memberNo !== action.payload)) ]
                }
            }
        }
    }
})



export const { login, logout, setComments, updateComments, addFollowing, removeFollowing } = memberSlice.actions;
export default memberSlice.reducer;
export { initialState };
export { followInit };
