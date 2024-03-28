import { IPaginationOptions } from "../../interfaces/pagination";

export type TFoundItemPayload ={
    userId: string;
    categoryId: string;
    foundItemName: string;
    description: string;
    location: string;
}

export type TFoundItemQuery ={
    searchTerm: string;
    foundItemName: string;
    foundDate: string;
    createdAt?:Date
} & IPaginationOptions
