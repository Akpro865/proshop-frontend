import { Link } from 'react-router-dom'
import Rating from '../comps/Rating'
import Category from '../comps/Category'
import { useSelector } from 'react-redux'
import { getProducts } from '../feature/productSlice'
import FeaturedSlider from '../comps/FeaturedSlider'
import FeaturedCard from '../comps/FeaturedCard'
import ProductSlide from '../comps/ProductSlide'

const Home = ()=>{

	const products = useSelector(getProducts)
	console.log(products)

	return(
	  <>
	  <Category />
	  <FeaturedSlider /> 	  
	  <FeaturedCard />
	  <ProductSlide />
	  <p className='flex justify-center text-gray-600 mt-1'>buy in all categories</p>
	  <div className='grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1'>
	   { products && 
	   	products.map((product, i) => (
	   	  <Link to={`/product/${product._id}`} key={i}>
	   	  <div className='bg-teal-50 m-3 p-3 rounded cursor-pointer'>
	   	   <div className='flex justify-center'>
	   	   <img src={product.img} className='h-48 object-cover hover:scale-100'/>
	   	   </div>
	   	   <div className='flex flex-col justify-center items-center'>
	   	   <h3 className='my-1 font-bold '>{product.name}</h3>
	   	   <div className='my-1'>{<Rating value={product.rating} text={`${product.numReviews} reviews`}/>}</div>
	   	   <h3 className='my-1 font-bold text-xl'>₹{product.price}</h3>
	   	   </div>
	   	  </div>
	   	  </Link>
	   	))
	   }
	  </div>
	  	  
	  </>
	)
}

export default Home