import { IProduct } from "./product.model";
import { IProductComment } from "./comment.model";

export interface IProductsResponse{
    products : IProduct [];
    total : number;
    skip : number;
    limit : number;

}

export interface ICommentsResponse{
    comments : IProductComment [];
    total : number;
    skip : number;
    limit : number;

}