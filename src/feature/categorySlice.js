import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { url } from '../network'

const initialState = {
	categories: []
}

export const fetchCategory = createAsyncThunk('categories/fetchCategory', async()=>{
  try{
		const { data } = await url.get('/api/categories')
		return data
	} catch(err) {
		console.log(err)
	}
})

export const CategorySlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.fulfilled, (state, {payload}) => {
        state.categories = payload
      })
    }
})


export const getCategories  = (state)=>state.categories.categories
export default CategorySlice.reducer