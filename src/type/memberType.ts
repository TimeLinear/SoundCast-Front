export type Member = {
    profile :string
    nickName : string
    email: string
    banner: string
    introduce: string
    follow: number
}

export type SetMember = (list:Member) => void;

export interface Props{
    member: Member;
    setMember: SetMember
}