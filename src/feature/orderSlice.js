import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { url } from '../network'

const currentLocalPay = localStorage.getItem('currentPay') ? JSON.parse(localStorage.getItem('currentPay')) : null

const initialState = {
	orders: null,
	allOrders: [],
	placedOrder: {},
	success: false,
	orderPaySuccess: false,
	currentPay: currentLocalPay
}

export const placeOrder = createAsyncThunk('order/placeOrder', async({id, token, orderData})=>{
	console.log('placeOrderSlice',id, token, orderData)
  try{
		const { data } = await url.post('/api/orders', orderData, {headers: {
			Authorization: `Bearer ${token}`,
		}})
		localStorage.removeItem('cartItems')
		return data
	} catch(err) {
		console.log(err)
	}
})

export const fetchOrders = createAsyncThunk('order/fetchOrders', async({id, token})=>{
	console.log(id, token)
  try{
		const { data } = await url.get(`/api/orders/${id}`, {headers: {
			Authorization: `Bearer ${token}`,
		}})
		return data
	} catch(err) {
		console.log(err)
	}
})

export const fetchAllOrders = createAsyncThunk('order/fetchAllOrders', async(token)=>{
	console.log('orderSlice - fetchAllOrders async',token)
  try{
		const { data } = await url.get(`/api/orders/userorders`, {headers: {
			Authorization: `Bearer ${token}`,
		}})
		return data
	} catch(err) {
		console.log(err)
	}
})

export const orderPay = createAsyncThunk('order/orderPay', async({id, token})=>{
  try{
		const { data } = await url.put(`/api/orders/${id}/pay`, {headers: {
			Authorization: `Bearer ${token}`,
		}})
		console.log(data)
		localStorage.removeItem('currentPay')
		return data
	} catch(err) {
		console.log(err)
	}
})
export const OrderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
    builder
    .addCase(placeOrder.fulfilled, (state, {payload}) => {
    	state.success = true
    	state.placedOrder = payload
      console.log(payload)        
      })
      .addCase(fetchOrders.fulfilled, (state, {payload}) => {        
				state.orders = payload
        console.log('orderSlice - fetchOrders',payload)        
      })
      .addCase(fetchAllOrders.fulfilled, (state, {payload}) => {        
				state.allOrders = payload
        console.log('orderSlice - fetchAllOrders',payload)        
      })
      .addCase(orderPay.fulfilled, (state, {payload}) => {        
				state.orderPaySuccess = true    
      })
    }
})


export const getOrders  = (state)=>state.order.orders
export const getAllOrders  = (state)=>state.order.allOrders
export const getPlacedOrder = (state)=>state.order.placedOrder
export const getCurrentPay = (state)=>state.order.currentPay
export const getSuccess  = (state)=>state.order.success
export const getOrderPaySuccess  = (state)=>state.order.orderPaySuccess
export default OrderSlice.reducer