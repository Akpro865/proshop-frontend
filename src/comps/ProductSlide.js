import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getProducts } from '../feature/productSlice'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'

export default function ProductSlide(){
	const products = useSelector(getProducts)

	const Prev = (props)=>(
 			 <MdArrowBackIos {...props} className='text-6xl z-10 hover:text-white cursor-pointer text-gray-400 -left-2 p-1 text-gray-400 absolute z-50 m-auto top-0 bottom-0'/>			
	)

	const Next = (props)=>(
 			 <MdArrowForwardIos {...props} className='text-6xl z-10 cursor-pointer hover:text-white text-gray-400 -right-7 p-1 z-50 absolute m-auto top-0 bottom-0'/>			
	)

	var settings = {
     infinite: true,
     speed: 1000,
     initialSlide: 1,
     cssEase: "linear",
     arrows: true,
     prevArrow: <Prev />,
     nextArrow: <Next />,
     responsive: [
     {
      	breakpoint: 1400,
      	settings: {
      		slidesToShow: 4,
      		slidesToScroll: 1,
      	}
      },
      {
      	breakpoint: 1062,
      	settings: {
      		slidesToShow: 3,
      		slidesToScroll: 1,
      	}
      },
      {
      	breakpoint: 768,
      	settings: {
      		slidesToShow: 2,
      		slidesToScroll: 1,
      	}
      },
      {
      	breakpoint: 550,
      	settings: {
      		slidesToShow: 1,
      		slidesToScroll: 1,
      	}
      },
      

     ]
  	}

	return (
	<div className='px-2 md:px-4 lg:px-6 my-6 pb-4'>
	 <h2 className='text-4xl flex justify-center my-8 font-bold'>Feaured Products!</h2>
	 <Slider {...settings} style={{margin:"10px"}}>
	  {products && products.map((product, i)=>(
	  	<div key={i} className='grid place-items-center'>
	  	<div className='w-60 lg:w-54 border rounded-xl bg-white flex flex-col justify-center m-auto overflow-hidden'>	  	
		    <img src={product.img} className='w-42 h-52 overflow-hidden object-cover' />
		    <div className='p-3 bg-white flex flex-col justify-center items-center'>
		      <h4 className='font-bold my-1.5 text-gray-800 flex justify-center'>{product.name ? product.name.substring(0, 15) : null}..</h4>
		      <p className='text-gray-600 flex justify-center py-1'>{product.desc ? product.desc.substring(0, 20) : null}..</p>
		      <Link to={`/product/${product._id}`} className=''>
		        <button className='rounded my-2.5 py-1.5 px-3 bg-green-400 text-white font-medium'>check now</button>
		      </Link>
		   </div>
	  	</div>
	  	</div>
	  ))}
	 </Slider>
	</div>
	)
}