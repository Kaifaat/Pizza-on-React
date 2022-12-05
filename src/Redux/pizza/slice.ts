import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Pizza, PizzaSliceState, Status} from "./types";
import {fetchPizzas} from "./asyncActions";


const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING, // loading | success | error
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [];
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        })
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
        })

    }
    // extraReducers: {
    //     [fetchPizzas.pending]: (state) => {
    //         state.status = 'loading';
    //         state.items = [];
    //         console.log(state.status)
    //     },
    //     [fetchPizzas.fulfilled]: (state, action) => {
    //         state.items = action.payload;
    //         state.status = 'success';
    //         console.log(state.status)
    //         console.log(action.payload)
    //     },
    //     [fetchPizzas.rejected]: (state) => {
    //         state.status = 'error';
    //         state.items = [];
    //         console.log(state.status)
    //     }
    // }
})

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;