import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getUser } from '../feature/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { url } from '../network'
import '../styles/product.css'
import twitter from '../assets/twitter.png'
import linked from '../assets/linked.png'
import google from '../assets/google.png'
import github from '../assets/github.png'

export default function Register(){
	const [details, setDetails] = useState({
		name: "",
		email: "",
		password: ""
	})
	
	const navigate = useNavigate()
	const user = useSelector(getUser)

	useEffect(()=>{
		if(user){
			navigate('/')
		}
		// const socialUser = async ()=>{
		// 	const { data } = await url.get('/api/socialauth/login/success', 
		// 		{ withCredentials: true,
	 //    		headers: {
	 //         "Access-Control-Allow-Credentials" : true
	 //       }}
		// 	)

		// 	console.log(data)
	 //  }

	 //  socialUser()
	}, [])
	const handleChange = (e)=>{		
		setDetails(prev=>({
			...prev,
			[e.target.name]: e.target.value
		}))
	}
	
	const handleRegister = async()=>{
		try{
			const { data } = await url.post('/api/auth/register', details)
			navigate('/login')
		}catch(err){
			console.log(err)
		}
	}

	const googleSignUp = ()=>{
	    window.open('http://localhost:5000/auth/google', '_self')
	}

	const githubSignUp = ()=>{
	    window.open('http://localhost:5000/auth/github', '_self')
	}

	return(
	 <div className='fullScreen flex items-center justify-center'>
	  <div className='flex flex-col shadow px-10 py-4 rounded'>
	   <h3 className='font-bold text-3xl my-3 flex justify-center text-gray-800'>Register</h3>
	   <input placeholder='username' onChange={handleChange} name='name' className='h-14 pl-1 border rounded my-2 outline-none'/>
	   <input onChange={handleChange} placeholder='email' name='email' className='h-14 pl-1 border rounded my-2 outline-none'/>
	   <input onChange={handleChange} placeholder='password' name='password' className='h-14 pl-1 border rounded my-2 outline-none'/>
	   <button onClick={handleRegister} className='w-full bg-green-500 rounded font-bold cursor-pointer hover:bg-green-600 text-white py-3 my-2'>Create</button>
	   
       <div className=''>         
         <div className='flex justify-center'>
          <img onClick={googleSignUp} src={google} className='h-10 m-1 w-10 cursor-pointer rounded-full p-1 bg-cyan-50'/>
          <img src={linked} className='h-10 w-10 m-1 rounded-full cursor-pointer p-1 bg-cyan-50'/>
          <img onClick={githubSignUp} src={github} className='h-10 w-10 m-1 rounded-full p-1 bg-cyan-50 cursor-pointer'/>
          <img src={twitter} className='h-11 w-11 font-bold m-1 rounded-full p bg-cyan-50 cursor-pointer'/>
         </div>
        </div>        
        <div className='flex justify-end items-center  text-xs'>
		  <span className='text-gray-700'>Already have account? &nbsp;</span>
		   <Link to='/login'>
	      <span className='text-red-500 text-sm font-medium'>login</span>
	     </Link>
       </div>
	  </div>
	 </div>
	)
}