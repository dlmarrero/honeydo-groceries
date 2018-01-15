import { Product } from "./product";

export interface GroceryList {
    id?: number,
    title: string,
    type: string,
    date: Date
    products?: Product[]
}