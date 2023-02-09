import { Link } from 'react-router-dom'
import { AiOutlineUser } from 'react-icons/ai'
import { BsCart } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategory } from '../feature/categorySlice'
import { fetchProducts } from '../feature/productSlice'
import { getCartItems } from '../feature/cartSlice'
import { getUser, logOut } from '../feature/authSlice'
import { useEffect } from 'react'
import bag from '../assets/bag.svg'
import logo from '../assets/logo/vector/default-monochrome.svg'
import profile from '../assets/logo/profile.png'
import '../styles/header.scss'
import { url } from '../network'

export default function Header(){
	const dispatch = useDispatch()
	const cartItems = useSelector(getCartItems)
	const user = useSelector(getUser)

	useEffect(()=>{
		dispatch(fetchProducts())
		dispatch(fetchCategory())
		// try{
		// 	const socialUser = async ()=>{
		// 		const { data } = await url.get('/auth/login/success', 
		// 			{ withCredentials: true,
		//     		headers: {
		//          "Access-Control-Allow-Credentials" : true
		//        }})
		// 	console.log('user', data)
		// 	}

		//     socialUser()
		// }catch(err){
		// 	console.log(err.message)
		// }
	}, [dispatch, user])

	const handleLogOut = ()=>{
		dispatch(logOut())
		window.location.replace('/')
	}

	const logout = ()=>{
    	window.open('http://localhost:5000/auth/logout', '_self')
  	}

	return(
	  <nav className='flex sticky z-50 bg-white top-0 justify-around items-center border-b p-3 sm:mx-10'>
	   <Link to='/'>
	     <img src={logo} className='h-8 '/>    
	   </Link>
	   <div className='h-11 bg-white flex items-center rounded'>
	     <input  className='w-32 lg:w-auto h-full border outline-none rounded-l pl-2 ' placeholder='something...'/>
	     <button className='bg-green-500 font-bold text-white h-full px-2 lg:px-3 rounded-r cursor-pointer hover:bg-green-600'>search</button>
	   </div>
	   <div className='flex items-center text-gray-800'>
	   { user ? (
	   	  
	   	  <div className='profile'>
	   	   <Link to='/profile'>
	   	    <div className='mx-4 relative flex items-center cursor-pointer'>
	   	    {user.name}
	   	    <img src={profile} className='h-10 w-10 rounded-full ml-1 object-cover'/>
	   	   </div>
	   	   </Link>
	   	   <div className='options top-12 border font-medium text-gray-700 px-7 py-1 m-2 shadow-xs'>
	   	    <Link to='/profile' className='py-1 my-1'>
	   	     <span className='hover:text-green-500'>profile</span>
	   	    </Link>
	   	    <span onClick={handleLogOut} className='py-3 my-2 border-t hover:text-red-500'>Logout</span>
	   	   </div>
	   	  </div>	   	  
	   ) : (
	   <>
	   <Link to='/register'>
	   <div className='rounded cursor-pointer font-semibold flex items-center hover:text-gray-800 px-4 py-2 hover:bg-cyan-50'>	   	 
	     <span>Register</span>
	   </div>
	   </Link>
	   <Link to='/login'>
	   <div className='font-semibold cursor-pointer rounded flex items-center hover:text-gray-800 px-4 py-2 hover:bg-cyan-50'>	   	 
	     <span>LogIn</span>
	   </div>
	   </Link>	
	   </>   
	   )}	  
	   <Link to='/cart'> 
	   <div className='mx-4 p-1 relative cursor-pointer hover:text-blue-600'>	    
	      <img src={bag} className='w-5 h-5' />
	      <span className='bg-red-600 w-4 h-4 text-white flex justify-center items-center rounded-full -top-2 -right-1 absolute p-2.5'>{cartItems.length}</span>
	      
	   </div>
	   </Link>
	   </div>
	  </nav>
	)
}