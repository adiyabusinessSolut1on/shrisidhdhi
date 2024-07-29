import { store } from './store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export interface ItemWithImage{
    // _id:string;
    name:string;
    price:number;
    image:string;
    // description:string;
    // wholesale_price:string;
    // category:string;
    // createdAt:string;
}