export interface IProduct{
    id : number;
    title : string;
    description : string;
    price : number;
    rating : number;
    category : string;
    stock : number;
    thumbnail : string;
    discountPercentage : number;

}

export type IProductCreate = Omit <IProduct, 'id'| 'discountPercentage'>
export type IProductUpdate = Partial<IProductCreate> & {id:number}