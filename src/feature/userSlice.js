import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { url } from '../network'

const localUser = JSON.parse(localStorage.getItem('userInfo'))

const initialState = {
	user: localUser ? localUser : null
}

// const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

export const updateUser = createAsyncThunk('auth/updateUser', async({id, userData, token}, thunkAPI)=>{
	console.log(id, token, userData)	
  try{
		const { data } = await url.put(`/api/user/${id}`, userData, {headers: {
			Authorization: `Bearer ${token}`,
		}})
		const updatedData = { ...data, accessToken: token }
		localStorage.setItem('userInfo', JSON.stringify(updatedData))
		return updatedData
	} catch(err) {
		console.log(err)
	}
})

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
    builder
      .addCase(updateUser.fulfilled, (state, {payload}) => {
      	console.log(payload)
        state.user = payload
        //localStorage.setItem('userInfo', JSON.stringify(payload))
      })
    }
})

export default userSlice.reducer