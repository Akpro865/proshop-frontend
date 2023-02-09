import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../assets/google.png'
import img2 from '../assets/profile.jpg'
import img3 from '../assets/linked.png'
import offer from '../assets/offer.jpg'
import brands from '../assets/brands.png'
import shipping from '../assets/shipping.png'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'

const items = [
	{
		name: "Express Delivery",
		desc: "Get a superfast delivery.",
		image: offer
	},
	{
		name: "Upto 60%",
		desc: "Get upto 60% offer.",
		image: shipping
	},
	{
		name: "Your Favourite",
		desc: "Purchse all your brands.",
		image: brands
	},
]

export default function FeaturedCard(){	
	return(
	<div>
	 <p className='mt-1 text-gray-700 flex justify-center'>Find amazing things!</p>
	 <div className='flex justify-around flex-wrap my-3'>	 
	 {
		items.map((item,i) =>(
		  <div className='flex justify-evenly rounded bg-green-100 w-80 rounded py-1 px-1 my-1' key={i}>
		   <div className='p-3'>
		    <h4 className='font-bold my-1.5 text-gray-800'>{item.name}</h4>
		    <p className='text-gray-600'>{item.desc}</p>
		    <button className='rounded my-1.5 py-1.5 px-3 bg-green-400 text-white font-medium'>save now</button>
		   </div>		    
		   <div className='flex items-center'>
		    <img src={item.image} className='w-16 h-16 p-2' />
		   </div>
		  </div>
		))	 	
	 }	  
	 </div>
	
	</div>
	)
}