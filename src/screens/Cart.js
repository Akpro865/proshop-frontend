import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { addToCart, removeFromCart, getCartItems } from '../feature/cartSlice'
import { getUser } from '../feature/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import remove from '../assets/remove.svg'
import cart from '../assets/cart.svg'
import emptyCart from '../assets/emptyCart.webp'

function Cart(){
	
	const dispatch = useDispatch()	
	const navigate = useNavigate()
	const cartItems = useSelector(getCartItems)
	const user = useSelector(getUser)

	const handleRemoveItem = (id)=>{
		dispatch(removeFromCart(id))
	}

	const handleCheckout = ()=>{
		if(!user) navigate('/login')
		if(user) navigate('/shipping')
	}

	return(
	 <div className='bg-sky-50'>	  
	  {cartItems.length === 0 ? (
	  	 <div>
	  	  <div className='flex justify-center items-center p-4'>
	  	   <span className='p-2 flex justify-center items-center bg-blue-50 font-bold text-xl rounded'>your cart is empty</span>
	  	   <Link to='/'><span className='px-5 py-3 bg-green-500 font-bold text-white ml-3 rounded'>continue shopping</span></Link>
	  	  </div>
	  	  <img src={emptyCart} className='w-full object-cover fullScreen'/>
	  	 </div>
	  	) : (
	  <>
	  <div className='flex items-center justify-center pt-2'>
	   	   <img src={cart} className='h-12 w-12 ml-2' />
	       <h2 className='font-bold text-2xl text-sky-600'>Cart items</h2>	       
	       <Link to='/'><span className='px-3 py-1.5 bg-blue-300 hover:text-blue-600 ml-3 rounded'>continue shopping</span></Link>
	      </div>
	  <div className='flex'>
	   <div className='w-4/6 m-1'>
	   <div>	   	  
	  	  {cartItems.map((item, i) => (
	  	  	<div key={i} className='flex m-3 bg-white shadow rounded'>
	  	  	 <div className='flex justify-center h-32 basis-2/6'>
	  	  	  <img src={item.img} alt={item.name + nanoid()} className='h-32 w-46 p-2 object-cover'/>	  	  	
	  	  	 </div>
	  	  	 <div className='flex justify-around items-center basis-4/6'>
	  	  	  <div className='basis-3/6'>
	  	  	   <h3 className='my-2 text-xl font-bold'>{item.name}</h3>
	  	  	   <span>A {item.brand} product</span>
	  	  	   <p>{item.category}</p>
	  	  	  </div>
	  	  	  <div className='basis-1/6'>	  	  	   
	  	  	   <select 	  	  	      
	  	  	   	  onChange={e => {
	  	  	   	  	const cartData = { ...item, qty: Number(e.target.value) }
	  	  	   	  	dispatch(addToCart(cartData))
	  	  	   	   }}
	  	  	   	  value={item.qty} 
	  	  	   	  className='w-16 bg-slate-50 text-center outline-none rounded p-1'>
	  	  	   	{
	          	[...Array(item.InStock).keys()].map(op =>(
	          		<option key={op + 1} value={op + 1} className='w-full rounded'>{op + 1}</option>
	          	))}
	          </select>
	  	  	  </div>
	  	  	  <div className='basis-1/6'>
	  	  	   ₹{ item.price }
	  	  	  </div>
	  	  	  <div className='basis-1/6'>
	  	  	   <img onClick={()=>handleRemoveItem(item._id)} src={remove} className='h-8 w-8 cursor-pointer'/>
	  	  	  </div>
	  	  	 </div>
	  	  	</div>	  	
	  	))
	  	 }
	  	 </div>
	  	
	  </div>
	  <div className='w-2/6 m-3'>
	   <div className='mx-4 my-1 border shadow bg-white px-5 rounded'>
	    <div className='flex justify-center font-bold text-2xl my-4 mt-6'>
	     <span>CART PRODUCTS</span>
	    </div>
	    <div className='flex justify-between p-2 border-b'>
	     <span className='p-1'>items</span>
	     <span className='p-1'>{cartItems.reduce((acc, item)=> acc + item.qty , 0 )}</span>
	    </div>
	    <div className='flex justify-between p-2 border-b'>
	     <span className='p-1'>tax</span>
	     <span className='p-1'>₹0.00</span>
	    </div>	    
	    <div className='flex justify-between p-2 border-b'>
	     <span className='p-1'>total</span>
	     <span className='p-1'>₹{cartItems.reduce((acc, item)=> acc + item.qty * item.price , 0 ).toFixed(2) }</span>
	    </div>
	    <div className='my-2 mb-4 p-2'>
	     <button onClick={handleCheckout} className='w-full py-2.5 bg-green-500 rounded text-white font-bold'>Checkout Now</button>
	    </div>
	   </div>
	  </div>	  
	 </div>
	 </>
	 )}
	 </div>
	)
}

export default Cart