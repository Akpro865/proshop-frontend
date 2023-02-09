import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../feature/authSlice'
import { getCurrentPay, orderPay } from '../../feature/orderSlice'
import { useNavigate } from 'react-router-dom'

export default function Success(){

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector(getUser)
	const order = useSelector(getCurrentPay)

	useEffect(()=>{
	 setTimeout(async()=>{
	 	await dispatch(orderPay({id: order._id, token: user.accessToken}))
	 	navigate(`/orders/${order._id}`)
	 }, 2000)
	}, [dispatch, order, user, navigate])
	return(
	  <div className='flex pt-10 text-green-600 font-bold'>
	   payment Success
	  </div>
	)
}