import { IPaginationOptions } from "../../interfaces/pagination";

export type TFoundItemPayload ={
    userId: string;
    categoryId: string;
    foundItemName: string;
    description: string;
    location: string;
    foundDate :    Date
    claim_process: string
    phone?:         string
    email? :        string
    img?:           string
}

export type TFoundItemQuery ={
    searchTerm: string;
    foundItemName: string;
    foundDate: string;
    createdAt?:Date
    userId?: string;
    location?: string;
    categoryId?: string;
} & IPaginationOptions
