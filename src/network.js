import axios from 'axios'

export const url = axios.create({
	baseURL: "https://proshop-server-nbjq.onrender.com"
})