import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { url } from '../network'

const initialState = {
	products: [],
	product: []
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async()=>{
  try{
		const { data } = await url.get('/api/products')
		return data
	} catch(err) {
		console.log(err)
	}
})

// fetch single product
export const fetchProduct = createAsyncThunk('products/fetchProduct', async(id)=>{
  try{
		const { data } = await url.get(`/api/products/${id}`)
		return data
	} catch(err) {
		console.log(err)
	}
})

export const ProductSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, {payload}) => {
        state.products = payload
      })
      .addCase(fetchProduct.fulfilled, (state, {payload}) => {
        state.product = payload
      })
    }
})


export const getProducts  = (state)=>state.products.products
export const getProduct  = (state)=>state.products.product
export default ProductSlice.reducer