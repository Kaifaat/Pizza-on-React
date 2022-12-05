import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {Pizza} from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {
            sortBy,
            order,
            category,
            search,
            currentPage
        } = params;
        const { data } = await axios.get<Pizza[]>(
            `https://6322ee4e362b0d4e7dd6b76b.mockapi.io/Items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        );
        console.log(data)
        return data;

        //     if(data.length === 0) {
        //         return thunkAPI. rejectWithValue('Пиццы пустые');
        //     }
        //     return thunkAPI.fulfillWithValue(data);
        // }
    });