import { Link, useParams, useNavigate } from 'react-router-dom'
import Rating from '../comps/Rating'
import '../styles/product.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../feature/productSlice'
import { addToCart } from '../feature/cartSlice'
import { getUser } from '../feature/authSlice'
import { useEffect, useState, useRef } from 'react'
import Toast from '../comps/Toast'
import { url } from '../network'
import { toast } from 'react-toastify';

export default function Product({histroy}){
	const [qty, setQty] = useState(Number(1))
	const [comment, setComment] = useState("")
	const [rating, setRating] = useState(null)
	const { id } = useParams()
	const dispatch = useDispatch()
	const { product } = useSelector(state=>state.products)
	const user = useSelector(getUser)
	const navigate = useNavigate()
	const toastId = useRef(null)

	useEffect(()=>{
		dispatch(fetchProduct(id))
	}, [dispatch, id])

	const numQty = Number(qty)
	const cartData = { ...product, qty }
	const addCart = ()=>{
		dispatch(addToCart(cartData))
		navigate(`/cart`)
	}

	const handleReview = async()=>{
		try{
			const res = await url.post(`/api/products/${id}/review`, {rating, comment}, {
			headers: {
				Authorization: `Bearer ${user.accessToken}`
			}})			
			console.log(res)
			toastId.current = toast.success(res.data)			
		}catch(err){
			console.log(err)
			toastId.current = toast.error(err.response.data)
		}
		
	}

	console.log(rating, comment)
	return (
	  <div>
	   <Toast />	   		  
	   <Link to='/'>
	    <button className='bg-green-100 ml-3 px-3 py-1 rounded my-2 hover:bg-green-200'>back</button>
	   </Link>	   
	   { product ? (
	   		<div className='flex'>
	    <div className='basis-3/6 productImg bg-cyan-50 flex justify-center items-center m-3 rounded overflow-hidden'>
	     <img src={product.img} alt={product.name} className='productImg object-cover'/>
	    </div>
	    <div className='basis-2/6 p-3'>
	     <h2 className='text-4xl font-bold my-1 border-b pb-4 p-2'>{product.name}</h2>
	     <div className='text-gray-800 my-3 border-b pb-6 p-2 font-medium'>{product.desc}</div>
	     <div className='my-4 border-b pb-5 p-2'>
	       <Rating value={product.rating} text={`${product.numReviews} reviews`} />
	     </div>
	     <div className='p-2 font-bol text-xl my-2 border-b pb-6'><span>price: ₹</span>{product.price}</div>
	    </div>
	    <div className='basis-1/6 '>
	      <div className='border-2 rounded my-20'>
	        <div className='border-b p-4 flex justify-between'>
	          <span>price :</span>
	          <span>₹{product.price}</span>
	        </div>
	        <div className='border-b p-2 flex justify-between'>
	          <span className='p-1'>status :</span>
	          <span className='p-1'>{product.InStock !== 0 ? 'In stock' : 'out of stock'}</span>
	        </div>
	        { product.InStock !== 0 ? (
	        <>
	        <div className='border-b p-3 flex justify-between'>
	          <span>qty :</span>
	          <select value={qty} onChange={e=>setQty(Number(e.target.value))} className='w-2/4 text-center outline-none rounded p-1'>{
	          	[...Array(product.InStock).keys()].map(op =>(
	          		<option key={op + 1} value={op + 1} className='w-10 rounded'>{op + 1}</option>
	          	))
	          }</select>
	        </div>
	        <div className='p-3'>
	          <button onClick={addCart} className='w-full py-2 px-4 cursor-pointer font-medium rounded bg-green-500 text-white'>ADD TO CART</button>	          
	        </div>
	        </>)
	        : null}
	      </div>
	    </div>
	   </div>
	   	) : (
	   		<div className='text-green-600 font-bold flex justify-center'>Loading please wait...</div>
	   	)}	   

	{/* review part */}
	   <div className='flex m-3'>
	    <div className='w-3/5 p-1 rounded mr-3'>
	     <h4 className='my-2 font-bold text-xl'>Customer Reviews:</h4>
	     { product && product.reviews ? product.reviews.map(item => (
	     	<div className='bg-gray-50 rounded py-2 px-4 my-1'>
		      <div className='my-1 p-1 font-bold'>{item.name}</div>
		      <div className='my-1 p-1'><Rating value={item.rating} /></div>
		      <div className='my-2 p-3 w-4/6 bg-cyan-200 rounded'>{item.comment}</div>
		     </div>
	     )) : (
	     	<div className='p-3 rounded bg-cyan-100 font-bold text-gray-800 py-2'>No reviews found</div>
	     )}	     	    
	    </div>
	    <div className='w-1/2'>
	    <h4 className='my-2 p-1 text-xl flex justify-center font-bold'>Write a Review</h4>
	    <div className='p-2 flex justify-center bg-gray-50 mt-1 rounded'>
	     <div className=''>
	     <h5 className='p-1 my-1 font-bold'>Rate the product:</h5>
	     <select onChange={(e)=>setRating(e.target.value)} className='w-full p-1 py-2 my-2 rounded outline-none'>
	      <option>select rating</option>
	      <option value='1'>1 - Very poor</option>
	      <option value='2'>2 - Not bad</option>
	      <option value='3'>3 - Average</option>
	      <option value='4'>4 - Super</option>
	      <option value='5'>5 - Excellent</option>
	     </select>
	     <h5 className='p-1 my-1 font-bold'>Comment:</h5>
	     <textarea onChange={(e)=>setComment(e.target.value)} className='my-2 p-1 w-full outline-none border-2 h-24 rounded'></textarea>
	     <button onClick={handleReview} className='my-1 rounded bg-black cursor-pointer px-3 w-full py-2 font-bold text-white'>submit</button>
	     </div>
	    </div>
	    </div>
	   </div>
	  </div>
	)
}