import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    items: [],
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state,action)=>{
            const item = action.payload;
            const existing = state.items.find((i)=> i.id === item.id);
            if(existing){
                existing.quantity += item.quantity ||1;
        }else{
            state.items.push({...item, quantity: item.quantity ||  1});
        }},
        removeFromCart: (state, action)=>{
            state.items = state.items.filter((i)=> i.id !== action.payload);
        },
        updateQty: (state,action)=>{
            const {id, quantity} = action.payload;
            const item = state.items.find((i)=> i.id === id);
            if(item) item.quantity = Math.max(1, quantity);
        },
        clearCart : (state)=>{
            state.items = [];
        },
        hydrateCart: (state, action)=>{
            state.items = action.payload || [];
        },

    },




});




export const {addToCart, removeFromCart, updateQty, clearCart, hydrateCart} = cartSlice.actions;
export default cartSlice.reducer;