import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name : 'product',
    initialState : {
        allProducts : [],
        isLoading : false
    },
    reducers : {
        saveAllProductsAction : (state,action) => {
            state.allProducts = action.payload
            state.isLoading = true            
        }
    }
})

export default productSlice.reducer
export const {saveAllProductsAction} = productSlice.actions