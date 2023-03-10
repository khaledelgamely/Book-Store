import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
    initialState: {
        cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
        isCartVisible: true
    },
    name: "cartStore",
    reducers: {
        addToCart: (state, action) => {
            const foundItem = state.cart.find(item => item.id === action.payload.id)
            if (foundItem) {
                foundItem.quantity += 1;
            } else {
                const cartClone = { ...action.payload, quantity: 1 }
                state.cart.push(cartClone)
            }
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        deleteItem: (state, action) => {
            const removeItem = state.cart.filter(item => item.id !== action.payload.id)
            state.cart = removeItem
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        clearCart: (state, action) => {
            state.cart = []
            localStorage.setItem("cart", JSON.stringify(state.cart))

        },
        decreaseItemQuantity: (state, action) => {
            const foundItem = state.cart.find(item => item.id === action.payload.id)
            if (foundItem.quantity > 1) {
                foundItem.quantity -= 1;
                state.cartTotalAmount -= foundItem.quantity * foundItem.price
            }
            else if (foundItem.quantity === 1) {
                return
            }
        },
        getCartHidden: (state, action) => {
            state.isCartVisible = false
        },
        getCartShown: (state, action) => {
            state.isCartVisible = true
        }
    },

})

export const { addToCart, deleteItem, clearCart, decreaseItemQuantity, getCartHidden, getCartShown } = cartSlice.actions;
export default cartSlice.reducer;


