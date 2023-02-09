import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'

export default function Rating({ value, text, color }){
	return(
	  <div className='flex text-xl'>
	   <span style={{color}}>{value >= 1 ? <BsStarFill /> : value >= 0.5 ? <BsStarHalf /> : <BsStar />}</span>
	   <span style={{color}}>{value >= 2 ? <BsStarFill /> : value >= 1.5 ? <BsStarHalf /> : <BsStar />}</span>
	   <span style={{color}}>{value >= 3 ? <BsStarFill /> : value >= 2.5 ? <BsStarHalf /> : <BsStar />}</span>
	   <span style={{color}}>{value >= 4 ? <BsStarFill /> : value >= 3.5 ? <BsStarHalf /> : <BsStar />}</span>
	   <span style={{color}}>{value >= 5 ? <BsStarFill /> : value >= 4.5 ? <BsStarHalf /> : <BsStar />}</span>
	   <span className='ml-1 text-xs text-gray-700 flex items-end'>{text}</span>
	  </div>
	)
}

Rating.defaultProps = {
	color : 'yellow'
}