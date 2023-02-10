import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { url } from '../network'

const localUser = JSON.parse(localStorage.getItem('userInfo'))

const initialState = {
	user: localUser ? localUser : null
}

export const loginUser = createAsyncThunk('auth/loginUser', async(userData)=>{
  try{
		const { data } = await url.post('/api/auth/login', userData, {
			headers: {
				'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
			}
		})
		return data
	} catch(err) {
		console.log(err)
	}
})

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logOut(){
			localStorage.removeItem('userInfo')
		}
	},
	extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, {payload}) => {
      	if(state.user !== undefined){
        	state.user = payload
        	localStorage.setItem('userInfo', JSON.stringify(payload))
        }
      })
    }
})

export const { logOut } = authSlice.actions
export const getUser  = (state)=>state.auth.user
export default authSlice.reducer