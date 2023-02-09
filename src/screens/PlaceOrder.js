import { FaUser } from 'react-icons/fa'
import { MdLocalShipping, MdLocationPin } from 'react-icons/md'
import { getCartItems, getShipping } from '../feature/cartSlice'
import { getUser } from '../feature/authSlice'
import { placeOrder, fetchOrders, getSuccess,
getOrders, getPlacedOrder } from '../feature/orderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PlaceOrder(){
	const [paymentMethod, setPaymentMethod] = useState('paypal')

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const cartItems = useSelector(getCartItems)
	const user = useSelector(getUser)
	const shipping = useSelector(getShipping)
	const newOrder = useSelector(getPlacedOrder)
	const orders = useSelector(getOrders)
	const success = useSelector(getSuccess)

	console.log('placeOrder comp', user, orders)

	useEffect(()=>{	  
	  if(success) {
	  	const orderFunc = async()=>{
	  		const res = await dispatch(fetchOrders({id: newOrder._id, token: user.accessToken}))
	  		navigate(`/orders/${newOrder._id}`)
	    }
	    orderFunc()
	  }
	},[navigate, success])

	const addDecimals = (number)=> {
		return (Math.round(number * 100) / 100).toFixed(2)
	}

	const itemsQty = cartItems.reduce((acc, item)=> acc + item.qty , 0)
	const subCartTotal = cartItems.reduce((acc, item)=> acc + item.qty * item.price , 0)
	const subtotal = addDecimals(subCartTotal)
	const shippingPrice = (subtotal < 500) ? 60.00 : 0.00
	const tax = 2.00
	const total = Number(subtotal) + Number(shippingPrice) + Number(tax)

	const orderData = {
		user: user._id,
		orderItems: cartItems, 
		shippingAddress: shipping, 
		paymentMethod: paymentMethod,
		taxPrice: tax, 
		shippingPrice: shippingPrice, 
		totalPrice: Number(total)
	}
	console.log(subtotal, shipping)
	const handlePlaceOrder = ({id, token})=>{
		console.log(id, token)
		dispatch(placeOrder({id, token, orderData}))
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
	    </div>
	   </div>
	   <div className='3 flex'>
	    <MdLocationPin className='h-16 w-16 bg-emerald-200 text-emerald-700 rounded-full p-4 m-2 mx-6 font-bold text-2xl'/>
	    <div className='flex flex-col'>
	     <h3 className='font-bold'>deliver address</h3>
	     <span>{shipping.address}</span>
	     <span>{shipping.city}</span>
	     <span>{shipping.country}</span>
	     <span>{shipping.postalCose}</span>
	    </div>
	   </div>
	  </div>
	  <div className='flex m-3'>
	   <div className='w-4/6 m-2'>
	    { cartItems.map((product, i)=>(
	      <div key={i} className='flex py-2 px-2 my-2 w-full justify-evenly border-b'>
	       <div className='w-1/3 flex justify-center items-center'>
	        <img src={product.img} className='h-24'/>
	       </div>
	       <div className='flex justify-around basis-2/3'>
	        <h4 className='w-1/2'>{product.name}</h4>
	        <h4 className='w-1/2'>₹{product.price}</h4>
	       </div>
	      </div>
	    )) }
	   </div>
	   <div className='w-2/6 lg:ml-5 my-6'>
	    <div className='w-full shadow p-3 py-2'>
	     <h3 className='flex font-bold text-2xl justify-center'>order</h3>
	     <div className='flex my-2 p-1.5 justify-between mx-6'>
	      <span>items</span>
	      <span>{itemsQty}</span>
	     </div>
	     <div className='flex my-2 p-1.5 justify-between mx-6'>
	      <span>tax</span>
	      <span>₹{tax}</span>
	     </div>	
	     <div className='flex my-2 p-1.5 justify-between mx-6'>
	      <span>shipping</span>
	      <span>₹{shippingPrice}</span>
	     </div>	
	     <div className='flex my-2 p-1.5 justify-between mx-6'> 
	      <span>sub total</span>
	      <span>₹{subtotal}</span>
	     </div>		
	     <div className='flex my-2 p-1.5 justify-between mx-6'>
	      <span>total</span>
	      <span>₹{total}</span>
	     </div>	 
	     <div className='mx-6'>  
	      <button onClick={()=>handlePlaceOrder({id: user._id, token: user.accessToken})} className='bg-green-500 w-full py-3 rounded my-3 cursor-pointer font-bold text-white'>place order</button>	  
	     </div>
	    </div>
	   </div>
	  </div>
	 </div>
	)
}