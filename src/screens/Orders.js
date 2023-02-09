import { FaUser } from 'react-icons/fa'
import { MdLocalShipping, MdLocationPin } from 'react-icons/md'
import { getCartItems, getShipping } from '../feature/cartSlice'
import { getUser } from '../feature/authSlice'
import { getOrders, fetchOrders, orderPay } from '../feature/orderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Stripe from './Payment/Stripe'
import logo from '../assets/logo/vector/default-monochrome.svg'
import { url } from '../network'
import moment from 'moment'

export default function Orders(){
	const [paymentMethod, setPaymentMethod] = useState('paypal')
	const [selectPay , setSelectPay] = useState("")
	const [show, setShow] = useState(false)

	const dispatch = useDispatch()
	const order = useSelector(getOrders)
	const user = useSelector(getUser)
	const shipping = useSelector(getShipping)
	const { id } = useParams()

	console.log(order, user)

	useEffect(()=>{
		const orderFunc = async()=>{
	  		const res = await dispatch(fetchOrders({id, token: user.accessToken}))	  		
	    }
	    orderFunc()
	}, [])

	const shippingPrice = order ? order.shippingPrice : 0
	const tax = order ? order.taxPrice : 0
	const total = order ? order.totalPrice : 0	

	const initRazorPayment = (data)=>{
		const options = {
			"key": "rzp_test_IMFaSxNr5SObok", // Enter the Key ID generated from the Dashboard
		    "amount": order.totalPrice * 100, 
		    "currency": "INR",
		    "name": "Akpro industries ltd",
		    "description": "test payment by ak",
		    "image": logo,
		    //"order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1		    		    
		    "handler": async (response)=>{
		    	console.log('response', response)
		    	if(response.razorpay_payment_id){
		    		await dispatch(orderPay({id: order._id, token: user.accessToken}))
		    		window.location.reload(false)
		    	}
		    	try{
		    		const { data } = await url.post('/api/razorpayment/verify', response)
		    		console.log('verify', data)
		    	}catch(err){
		    		console.log(err)
		    	}
		    }
		}

		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	}
	console.log(process.env.RAZORPAY_KEY_ID)
	const handleRazorPay = async ()=>{
		try{
			const { data } = await url.post('/api/razorpayment/orders', { id: order._id })
			console.log(data)
			initRazorPayment(data.data)
		}catch(err){
			console.log(err)
		}
	}
	return (
	 <div>
	  <div className='flex justify-evenly bg-emerald-100 items-center my-3  py-7'> 
	   <div className='1 flex p-3'>
	    <FaUser className='h-16 w-16 bg-emerald-200 text-emerald-700 rounded-full p-4 m-2 mx-6 font-bold text-2xl'/>
	    <div className='flex flex-col'>
	     <h3 className='font-bold'>Customer info</h3>
	     <span>{user.name}</span>
	     <span>{user.email}</span>
	    </div>
	   </div>
	   <div className='2 flex'>
	    <MdLocalShipping className='h-16 w-16 bg-emerald-200 text-emerald-700 rounded-full p-4 m-2 mx-6 font-bold text-2xl'/>
	    <div className='flex flex-col '>	     
	     <h3 className='font-bold'>shipping details</h3>
	     <span>{shipping.city}</span>
	     <span>method: paypal</span>
	     {order && order.isPaid ? <span className='px-3 py-2 rounded text-green-600 mt-1 text-center bg-green-300'>paid on {moment(order.paidAt).format("MMM Do YY")}</span> : <span className='px-3 py-2 rounded text-red-600 bg-red-200 mt-1 text-center'>not paid</span>}
	    </div>
	   </div>
	   <div className='3 flex'>
	    <MdLocationPin className='h-16 w-16 bg-emerald-200 text-emerald-700 rounded-full p-4 m-2 mx-6 font-bold text-2xl'/>
	    <div className='flex flex-col'>
	     <h3 className='font-bold'>delivery address</h3>
	     <span>{shipping.address}</span>
	     <span>{shipping.city}</span>
	     <span>{shipping.country}</span>
	     <span>{shipping.postalCose}</span>
	     {order && order.isDelivered ? <span className='px-3 py-2 rounded text-green-600 mt-1 text-center bg-green-300'>delivered at {moment(order.deliveredAt).format("MMM Do YY")}</span> : <span className='px-3 py-2 rounded text-red-600 mt-1 text-center bg-red-200'>not delivered</span>}
	    </div>
	   </div>
	  </div>
	  <div className='flex m-3'>
	   <div className='w-4/6 m-2'>
	    { order ? ( order.orderItems.map((product, i)=>(
	      <div key={i} className='flex py-2 px-2 my-2 w-full justify-evenly border-b'>
	       <div className='w-1/3 flex justify-center items-center'>
	        <img src={product.img} className='h-24'/>
	       </div>
	       <div className='flex justify-around basis-2/3'>
	        <h4 className='w-1/2'>{product.name}</h4>
	        <h4 className='w-1/2'>₹{product.price}</h4>
	       </div>
	      </div>
	    )) ) : null }
	   </div>
	   <div className='w-2/6 lg:ml-5 my-6'>
	    <div className='w-full shadow p-3 py-2'>
	     <h3 className='flex font-bold text-2xl justify-center'>order</h3>	     
	     <div className='flex my-2 p-1.5 justify-between mx-6'>
	      <span>tax</span>
	      <span>₹{tax}</span>
	     </div>	
	     <div className='flex my-2 p-1.5 justify-between mx-6'>
	      <span>shipping</span>
	      <span>₹{shippingPrice}</span>
	     </div>		
	     <div className='flex my-2 p-1.5 justify-between mx-6'>
	      <span>total</span>
	      <span>₹{total}</span>
	     </div>	 
	     <div className='mx-6'>  
	      {
	      	show ? (
	      	  <div className='flex flex-col justify-center'>
				  <Stripe order={order}/>
				  <button onClick={handleRazorPay} className='bg-black w-full py-2.5 rounded my-1 cursor-pointer font-bold text-white'>Razorpay</button>
			  </div>
	      	) : (
	      	 <div>
	      	  {
	      	  	order && order.isPaid ? (
	      	  		<button className='bg-green-500 w-full py-3 rounded my-3 cursor-pointer font-bold text-white'>Paid Done</button>
	      	  	) : (
	      	  		<button onClick={()=>setShow(true)} className='bg-green-500 w-full py-3 rounded my-3 cursor-pointer font-bold text-white'>pay now</button>
	      	  	)
	      	  }   	      	  
   	      	 </div>
	      	)
	      }	  
	     </div>
	    </div>
	   </div>
	  </div>
	 </div>
	)
}