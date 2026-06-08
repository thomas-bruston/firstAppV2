export interface IProduct{
    id : number;
    title : string;
    description : string;
    price : number;
    rating : number;
    category : string;
    stock : number;
    thumbnail : string;

}

export type IProductCreate = Omit <IProduct, 'id'>
export type IProductUpdate = Partial<IProductCreate> & {id:number}