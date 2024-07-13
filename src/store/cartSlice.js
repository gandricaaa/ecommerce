import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        totalProduct: 0,
        totalPrice: 0
    },
    reducers: {
        saveInCartAction: (state, action) => {
            // action.payload - novi proizvod koji ulazi u korpu
            // console.log(action.payload);

            let copyCart = [...state.cart];

            // LOGIKA
            // FIND_INDEX === DUPLIKATI
            let findeIndex = null;

            copyCart.find((item,index) => {
                if(item.id === action.payload.id){
                    findeIndex = index;
                    return;
                }
            })

            if(findeIndex === null){
                // PUSH
                copyCart.push({...action.payload, count: 1, cartTotal: action.payload.price})
                state.totalProduct++;
                state.totalPrice += Math.floor(action.payload.price);
            }else{
                // DODATI COUNT + 1
                copyCart[findeIndex].count++;

            }
            state.cart = copyCart;
            localStorage.setItem('cart_item', JSON.stringify(copyCart));
            localStorage.setItem('cart_total', JSON.stringify(state.totalProduct))
            
        },
        deleteFromCartAction: (state, action) => {
            let copyCart = [...state.cart];
            console.log(action.payload);

            let findIndex = null;

            copyCart.find((item,index) => {
                if(item.id === action.payload.id){
                    findIndex = index;
                    return;
                }
            })

            if(findIndex !== null){
                copyCart.splice(findIndex,1);
                state.totalProduct--;
                state.totalPrice = subTotal(copyCart)
            }

            state.cart = copyCart;
            localStorage.setItem('cart_item', JSON.stringify(copyCart));
            localStorage.setItem('cart_total', JSON.stringify(state.totalProduct))
        },
        setPriceHandlerAction: (state, action) => {
            const {increment, index} = action.payload;
            let copyCart = [...state.cart];
            
                copyCart[index].cartTotal += copyCart[index].price * increment;
                state.totalPrice = subTotal(copyCart)
                
                if(copyCart[index].count === 1 && increment === -1){
                    copyCart.splice(index,1);
                    state.totalProduct--;
                }else{
                    copyCart[index].count += increment
                }
                
                
                state.cart = copyCart;
                localStorage.setItem('cart_item', JSON.stringify(copyCart));
                localStorage.setItem('cart_total', JSON.stringify(state.totalProduct))
           
        }
    }
})


function subTotal(arrayCart) {
    return arrayCart.reduce((acc, current) => {
        return acc + current.cartTotal;
    }, 0)
}

export const {saveInCartAction,deleteFromCartAction,setPriceHandlerAction} = cartSlice.actions;
export default cartSlice.reducer;