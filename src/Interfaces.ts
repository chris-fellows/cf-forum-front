export interface IAdvert {
    Logo: string
    LogoType: number
    Name: string
}

export interface IGroup {
    ID: string
    Name : string
    Description: string
    Logo: string
 }

 export interface INewPostProps {
    groupId : string
    userId : string
    rootPostId : string
    parentPostId : string
}

export interface INewPost {
   groupId: string
   userId: string
   text: string
   rootPostId: string
   parentPostId: string
}

 export interface IPost {
    ID: string
    Text : string     
    CreatedDateTime : any   
    GroupID : string    
    UserID : string
    RootPostID : string
    ParentPostID : string
    UserName : string
    UserLogo : string
    UserPostInfoVote : number
    UserPostInfoTrack : number
 }

 export interface IUserPostInfoTrack {
   userId: string,
   track: number
 }

 export interface IUserPostInfoVote {
   userId: string,
   vote: number
 }

 export interface IUser {
    ID: string
    Name: string
    Email: string
    Logo: string
 }

 export interface IUserCredentials {
   username: string
   password: string
 }

 export interface ICurrentUserInfo {    
    email: string
    userName: string
    userId: string
    token : string
 }

 // Types for contain dependencies
 export type addPostServiceType = (post : INewPost) => any;
 export type deletePostByIdServiceType = (postId : string) => any;
 export type loginServiceType = (credentials : IUserCredentials) => any;
 export type logoutServiceType = () => any;
 export type getGroupServiceType = () => Promise<IGroup[]>;
 export type getGroupsServiceType = () => Promise<IGroup[]>;
 export type getPostsByRootPostServiceType = (postId : string, pageSize : number, pageNumber : number) => Promise<IPost[]>;
 export type getPostsByUserServiceType = (userid : string, pageSize : number, pageNumber : number) => Promise<IPost[]>;
 export type getRandomAdvertsServiceType = (number : number) => Promise<IAdvert[]>;
 export type getRootPostsByGroupServiceType = (id : string, pageSize : number, pageNumber : number) => Promise<IPost[]>;
 export type getUserServiceType = () => Promise<IUser[]>;
 export type getUsersServiceType = () => Promise<IUser[]>;
 export type votePostByIdServiceType = (postId : string, details : IUserPostInfoVote) =>  any;