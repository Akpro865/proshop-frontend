import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner from '../assets/banner.gif'
import banner2 from '../assets/banner2.gif'
import banner3 from '../assets/banner3.jpg'
import banner4 from '../assets/banner4.png'
import banner5 from '../assets/banner5.png'
import banner6 from '../assets/banner6.png'

const SlideImg = [banner, banner2, banner3, banner4, banner5, banner6]

export default function FeaturedSlider(){

	var settings = {
    infinite: true,    
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    initialSlide: 2,
    autoplaySpeed: 4000,
    cssEase: "linear"
  	}

	return(
	 <Slider {...settings}>
	 	{SlideImg.map(slide=>(
	 		<div>
	 		 <img src={slide} className='h-56 w-full object-cover rounded' />
	 		</div>
	 	))}
	 </Slider>
	)
}