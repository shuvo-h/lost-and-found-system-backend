import { CLAIM_STATUS } from "@prisma/client";
import { IPaginationOptions } from "../../interfaces/pagination";

export type TLostItem ={
    categoryId: string;
    lostItemName: string;
    description: string;
    location: string;
    lostDate: string; 
    status?: CLAIM_STATUS;
    img?: string;
    phone?: string; 
    email?: string;
}

export type TLostItemQuery ={
    searchTerm: string;
    lostItemName: string;
    status: CLAIM_STATUS;
    lostDate: string;
    createdAt?:Date
    userId?: string;
    location?: string;
    id?: string;
    categoryId?: string;
} & IPaginationOptions
