import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../feature/authSlice'
import { addShippingAddress, getShipping } from '../feature/cartSlice'
import '../styles/product.css'

export default function Shipping(){
	const [details, setDetails] = useState({
		address: "", city: "", postalCode: " ",country: ""
	})

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector(getUser)
	const shipping = useSelector(getShipping)

	useEffect(()=>{
		if(shipping){
			setDetails({
				address: shipping.address,
				city: shipping.city,
				postalCode: shipping.postalCode,
				country: shipping.country
			})
		}
	}, [shipping])
	const handleChange = (e)=>{
		setDetails(prev =>({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const handleShipping = (e)=>{
		e.preventDefault()
		dispatch(addShippingAddress(details))
		navigate('/placeorder')
	}
	console.log(details)
	return (
	  <div className='fullScreen flex justify-center items-center'>
	   <form className='flex flex-col shadow rounded px-10 py-7 text-gray-700'>
	    <h3 className='font-bold flex text-3xl justify-center mb-3'>Shipping Address</h3>
	    <input value={details.address} onChange={handleChange} name='address' placeholder='Address' className='h-14 pl-1 outline-none border text-gray-700 my-2 rounded'/>
	    <input value={details.city} onChange={handleChange} name='city' placeholder='City' className='h-14 pl-1 outline-none border text-gray-700 my-2 rounded'/>
	    <input type='number' value={details.postalCode} onChange={handleChange} name='postalCode' placeholder='Postalcode' className='h-14 pl-1 outline-none border text-gray-700 rounded my-2'/>
	    <input value={details.country} onChange={handleChange} name='country' placeholder='Country' className='h-14 pl-1 outline-none border text-gray-700 my-2 rounded'/>
	    <button type='submit' onClick={(e)=>handleShipping(e)} className='bg-green-500 py-3.5 rounded my-2 font-bold text-white'>continue</button>
	   </form>
	  </div>
	)
}