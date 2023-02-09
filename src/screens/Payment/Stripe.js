import axios from 'axios'
import { url } from '../../network'
import { useSelector } from 'react-redux'
import { getUser } from '../../feature/authSlice'

export default function Stripe({order}){

  const user = useSelector(getUser)

  const handlePay = ()=>{
    url.post('/api/stripe/create-checkout-session', {
      orderItems: order.orderItems,
      userId: user._id,
      orderId: order._id
    }).then((res)=>{
      if(res.data.url){
        window.location.href = res.data.url
        localStorage.setItem('currentPay', JSON.stringify(order))
      }
    }).catch(err=> console.log(err))
  }

  return (
    <>
     <button onClick={handlePay} className='bg-black w-full py-2.5 rounded my-1 cursor-pointer font-bold text-white'>pay with card</button>
    </>
  )
}