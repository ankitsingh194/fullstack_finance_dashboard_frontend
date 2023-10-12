import { createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { GetkpisResponse , GetProductResponse, GetTransactionResponse } from "../src/states/types";

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "main",
    tagTypes:["kpis", "Products", "Transactions"],
    endpoints: (build) => ({
        getKpis: build.query<Array<GetkpisResponse>, void>({
            query:() => "kpi/kpis",
            providesTags: ["kpis"]
        }),
        getProducts: build.query<Array<GetProductResponse>,void>({
            query:() => "product/products/",
            providesTags: ['Products'],

        }),
        getTransactions : build.query<Array<GetTransactionResponse>,void>({
            query:() => "transaction/transactions/",
            providesTags: ['Transactions'],

        }) 
        
    })
})

export const {useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery} = api;