import { IAdvert, IAuditEvent, IContent, IContentSummary, IGroup, IGroupTag, ILanguage, IMenuItem, INewPost, INewRootPost, IPage, IPost, ITag, IUser, IUserCredentials, IUserPostInfoTrack, IUserPostInfoVote } from "./Interfaces";
import { ServiceFunctionType } from "./customTypes";

export interface IPasswordService {
    isValidPasswordFormat(password : string) : boolean;
 }
 
 export interface IPopupMenuFactoryService {
    GetTestMenuItems() : IMenuItem[]
 }

 
export interface IDependencyService {
    RegisterService: <T>(name : string, serviceFunction : ServiceFunctionType<T>) => void  
    IsRegistered: (name: string) => boolean
    GetService: <T>(name : string) => T
 }
 
 export interface IAdvertsService {
    GetAdverts: (find : string, pageSize : number, pageNumber : number) => Promise<IAdvert[]>
    GetAdvert: (id : string) => Promise<IAdvert[]>
    GetRandomAdvertsService: (number : number) => Promise<IAdvert[]>
 }
 
 export interface IAuditEventsService {
    GetAuditByHoursService: (hours: number, pageSize : number, pageNumber : number) => Promise<IAuditEvent[]>
    GetAuditByUserService: (userid: string, pageSize : number, pageNumber : number) => Promise<IAuditEvent[]>
 }
 
 export interface IContentsService {
    GetContent: (id : string) => Promise<IContent[]>
    GetContentByName: (name : string) => Promise<IContent[]>
    GetContentSummaries: () => Promise<IContentSummary[]>
 }
 
 export interface IGroupsService {
    GetGroups: (find : string) => Promise<IGroup[]>
    GetGroup: (id : string) => Promise<IGroup[]>
    GetGroupTags: (groupId : string) => Promise<IGroupTag[]>
    GetAllGroupTags: () => Promise<IGroupTag[]>
 }
 
 export interface ILanguagesService {
    GetLanguages: () => Promise<ILanguage[]>
 }
 
 export interface IPagesService {
    GetPages: () => Promise<IPage[]>
 }
 
 export interface IPostsService {
    AddPost: (post : INewPost) => Promise<IPost[]>
    GetPostsByRootPost: (postId : string, pageSize : number, pageNumber : number) => Promise<IPost[]>
    GetPostsByUser: (userid : string, pageSize : number, pageNumber : number) => Promise<IPost[]>
    DeletePostById: (postId : string) => Promise<any>
    UpdatePostById:(postId : string, details : any) => Promise<any>
    VotePostById: (postId : string, details : IUserPostInfoVote) => Promise<any>
    TrackPostById: (postId : string, details : IUserPostInfoTrack) => Promise<any>
 }
 
 export interface IRootPostsService {
    AddRootPost: (post : INewRootPost) => Promise<IPost[]>
    GetRootPostsByPopularity: (find : string,  pageSize : number, pageNumber : number) => Promise<IPost[]>   
    GetRootPostsByGroupService: (id : string, find : string,  pageSize : number, pageNumber : number) => Promise<IPost[]>
 }
 
 export interface ISecurityService {
    Login: (credentials : IUserCredentials) => Promise<any>
    Logout: () => Promise<any>
 }
 
 export interface ITagsService {
    GetTags: () => Promise<ITag[]>
 }
 
 export interface IUsersService {
    GetUsers: (find : string, pageSize : number, pageNumber : number) => Promise<IUser[]>
    GetUser: (id : string) => Promise<IUser[]>
    AddUserForgotPassword: (username : string) => Promise<any>
 }
 
 