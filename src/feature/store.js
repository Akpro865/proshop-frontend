import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './categorySlice'
import productReducer from './productSlice'
import cartReducer from './cartSlice'
import authReducer from './authSlice'
import userReducer from './userSlice'
import orderReducer from './orderSlice'

const cartFromLocal = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems')) : []

const userFromLocal = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingFromLocal = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress')) : null

const preloadedState = {
	cart: {
		cartItems: cartFromLocal,
		shippingAddress: shippingFromLocal
	},
	auth: {
		user: userFromLocal
	}
}

const store = configureStore({
	reducer: {
		categories: categoryReducer,
		products: productReducer,
		cart: cartReducer,
		auth: authReducer,
		user: userReducer,
		order: orderReducer
	},
	preloadedState
})

export default store