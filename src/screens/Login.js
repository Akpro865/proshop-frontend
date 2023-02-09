import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, getUser } from '../feature/authSlice'
import '../styles/product.css'

export default function Login(){
	const [details, setDetails] = useState({
		email: "",
		password: ""
	})

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector(getUser)

	useEffect(()=>{
		if(user) navigate('/')		
	}, [user])

	const handleChange = (e)=>{
		setDetails(prev=>({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const handleLogin = async()=>{
		if(!details.email || !details.password) alert('fill all fields')
		await dispatch(loginUser(details))		
	}
	console.log(details)
	return(
	 <div className='fullScreen flex items-center justify-center'>
	  <div className='flex flex-col shadow px-8 py-5 rounded'>
	   <h3 className='font-bold text-3xl my-3 flex justify-center text-gray-800'>Login</h3>
	   <input onChange={handleChange} placeholder='email' name='email' className='h-14 pl-1 border rounded my-2 outline-none'/>
	   <input onChange={handleChange} placeholder='password' name='password' className='h-14 pl-1 border rounded my-2 outline-none'/>
	   <button onClick={handleLogin} className='w-full bg-green-500 rounded font-bold cursor-pointer hover:bg-green-600 text-white py-3.5 my-1'>Login</button>	  
	    <Link to='/register'>
    	 <span className='text-red-500 mt-2 flex justify-end text-sm'>register</span>
        </Link>       
	  </div>
	 </div>
	)
}