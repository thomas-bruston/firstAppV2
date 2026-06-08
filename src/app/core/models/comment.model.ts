export interface IProductComment{
    id: number;
    postId : number;
    body : string;
    likes : number;
    user : {
        id : number;
        username : string;
        fullName : string;
    }
};

export type ICommentCreate = {
    userId : number;
    postId : number;
    body : string;
}
