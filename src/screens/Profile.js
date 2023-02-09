import profileImg from '../assets/logo/profile.png'
import bg from '../assets/logo/cover.png'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { getUser } from '../feature/authSlice'
import { updateUser } from '../feature/userSlice'
import { fetchAllOrders, getAllOrders } from '../feature/orderSlice'
import { toast } from 'react-toastify';
import Toast from '../comps/Toast'

export default function Profile(){
	const [profile, setProfile] = useState(true)
	const [details, setDetails] = useState({
		name: " ", email: " ", password: " ", password2: " "
	})

	const dispatch = useDispatch()
	const user = useSelector(getUser)
	const orders = useSelector(getAllOrders)
	const navigate = useNavigate()
	const toastId = useRef(null)

	useEffect(()=>{
	  if(!user) navigate('/login')
	  if(user){
	  	setDetails({
	  		name: user.name,
	  		email: user.email
	  	})
	  }
	  dispatch(fetchAllOrders(user.accessToken))	  
	}, [user])

	const handleChange = (e)=>{
		setDetails(prev=> ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const userData = { name: details.name, email: details.email, password: details.password }
	console.log(details)

	const handleUpdate = (e, id, token)=>{
		e.preventDefault()
		if(details.password !== details.password2){
			toastId.current = toast.error("password doesn't match!")
		} else{
			dispatch(updateUser({id, userData, token}))
			toastId.current = toast.success('profile updated successfully!')
		}
	}

	console.log(orders)
	return(
	  <div className='flex lg:mx-16 mt-10'>
	   <Toast />
	   <div className='basis-1/3 m-1'>
	    <div className='rounded shadow'>
	     <div className='relative'>
	      <img src={bg} className='h-24 object-cover w-full'/>
	      <img src={profileImg} className='h-16 w-16 rounded-full absolute -bottom-8 left-40 object-cover'/>
	     </div>
	      <div className='flex flex-col justify-center items-center pt-8'>
	       <div className='font-bold text-xl text-gray-800'>{user.name}</div>
	       <div className=''>{user.email}</div>
	      </div>
	     <span className='py-1 g-blue-50 flex justify-end mr-2 text-gray-700 text-xs'>created jun 20 2022</span>
	     <div onClick={()=>setProfile(true)} className='border-t mt-5 p-3.5 flex hover:bg-green-50 cursor-pointer justify-center'>Profile settings</div>
	     <div onClick={()=>setProfile(false)} className='border-t mb-1 p-3.5 flex justify-center hover:bg-green-50 cursor-pointer'>orders</div>
	    </div>
	   </div>
	   <div className='basis-2/3 m-1 mx-10 lg:mx-1'>
	    {user && profile ? (
	      <form className='text-gray-800'>
	       <div className='lg:flex justify-evenly mt-6'>
		       <div className='flex flex-col'>
		        <label className='my-2'>UserName</label>
		        <input value={details.name} onChange={handleChange} name='name' placeholder={user.name} className='h-14 pl-1 bg-green-50 rounded outline-none border'/>
		       </div>
		       <div className='flex flex-col'>
		        <label className='my-2'>E-mail</label>
		        <input value={details.email} onChange={handleChange} name='email' placeholder={user.email} className='h-14 pl-1 rounded bg-green-50 outline-none border'/>
		       </div>
	       </div>
	       <div className='lg:flex justify-evenly my-6'>
		       <div className='flex flex-col'>
		        <label className='my-2'>password</label>
		        <input required onChange={handleChange} name='password' className='h-14 pl-1 rounded outline-none bg-green-50 border'/>
		       </div>
		       <div className='flex flex-col'>
		        <label className='my-2'>confrim password</label>
		        <input required onChange={handleChange} name='password2' className='h-14 pl-1 rounded outline-none border bg-green-50'/>
		       </div>
	       </div>
	       <div className= 'flex justify-center'>
	        <button type='submit' onClick={(e)=>handleUpdate(e, user._id, user.accessToken)} className='w-5/6 bg-green-500 py-3 my-2 font-bold text-white rounded cursor-pointer'>Update Profile</button>
	       </div>
	      </form>
	    ) : (
	      <div className='mx-2 shadow rounded'>
	        <div className='flex bg-green-500 text-white p-3 font-bold'>
	         <div className='w-2/4'>order id</div>
	         <div className='w-1/4'>is Paid</div>
	         <div className='w-1/4'>total</div>
	        </div>
	        <div className=''>	 
	          {
	          	orders.map((order,i)=>(
	          	 <div key={i} className={`flex ${order.isPaid ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'} w-full p-4`}>
	          	  <Link to={`/orders/${order._id}`} className='w-2/4'>
 	          	   <div>{order._id}</div>
	          	  </Link>
	          	  <div  className='w-1/4'>{order.isPaid ? <span>paid</span> : <span>not paid</span>}</div>
	          	  <div className='w-1/4'>{order.totalPrice}</div>
	          	 </div>
	          	))
	          }       	          
	        </div>
	      </div>
	    )}
	   </div>
	  </div>
	)
}

