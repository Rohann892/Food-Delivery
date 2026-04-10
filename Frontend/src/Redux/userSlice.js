import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        city: null,
        state: null,
        currentAddress: null,
        shopInMyCity: null,
        itemsInCity: null,
        cartItems: [],
        totalAmount: null,
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        setCity: (state, action) => {
            state.city = action.payload
        },
        setState: (state, action) => {
            state.state = action.payload
        },
        setCurentAddress: (state, action) => {
            state.currentAddress = action.payload
        },
        setShopInMyCity: (state, action) => {
            state.shopInMyCity = action.payload
        },
        setItemsInCity: (state, action) => {
            state.itemsInCity = action.payload
        },
        addToCart: (state, action) => {
            const cartItem = action.payload;
            const existingItem = state.cartItems.find(i => i.id == cartItem.id);
            if (existingItem) {
                existingItem.quantity += cartItem.quantity
            }
            else {
                state.cartItems.push(cartItem)
            }
            state.totalAmount = state.cartItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cartItems.find(i => i.id == id);
            if (item) {
                item.quantity = quantity
            }
            state.totalAmount = state.cartItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter(i => i.id != id);
            state.totalAmount = state.cartItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
        },

    }
})
export const { setUserData, setCity, setState, setCurentAddress, setShopInMyCity, setItemsInCity, addToCart, updateQuantity, removeFromCart } = userSlice.actions
export default userSlice.reducer;