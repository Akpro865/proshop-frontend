import { createSlice, createAsyncThunk, createAction, createReducer } from '@reduxjs/toolkit'
import axios from 'axios'
import { url } from '../network'

const LocalShipping = JSON.parse(localStorage.getItem('shippingAddress'))

const initialState = {
	cartItems: [],
	shippingAddress: LocalShipping ? LocalShipping : null
}

export const CartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state, {payload}){
			const itemIndex = state.cartItems.findIndex(x => x._id === payload._id)
			console.log(itemIndex, payload)
			if (itemIndex >= 0) {
			    state.cartItems[itemIndex].qty = payload.qty
			} else {
				state.cartItems.push(payload)
			}
			localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
		},
		removeFromCart(state, {payload}){
			const filteredItem = state.cartItems.filter(x => x._id !== payload)
			state.cartItems = filteredItem
			localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
		},
		addShippingAddress(state, {payload}){
			state.shippingAddress = payload
			localStorage.setItem('shippingAddress', JSON.stringify(payload))
		}
	}	
})

export const { addToCart, removeFromCart, addShippingAddress } = CartSlice.actions
export const getCartItems  = (state)=>state.cart.cartItems
export const getShipping  = (state)=>state.cart.shippingAddress
export default CartSlice.reducer