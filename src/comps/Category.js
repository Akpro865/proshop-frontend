import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../feature/categorySlice'

export default function Category(){
	
	const categories = useSelector(getCategories)
	
	return(
		<>
		<p className='flex justify-center text-gray-600 mt-2'>search by categories</p>
		<div className='flex justify-evenly items-center my-2 border-b pb-2 p-1'>
		 {
		 	categories.map((cat, i) => (
		 		<div key={i} className='flex flex-col justify-center cursor-pointer items-center'>
		 		 <img src={cat.img} className='h-20 w-20 object-cover'/>
		 		 <span>{cat.name}</span>
		 		</div>
		 	))
		 }
		</div>
		</>
	)
}