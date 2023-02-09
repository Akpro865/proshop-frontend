import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Header from './comps/Header'
import Home from './screens/Home'
import Product from './screens/Product'
import Cart from './screens/Cart'
import Register from './screens/Register'
import Login from './screens/Login'
import Profile from './screens/Profile'
import Shipping from './screens/Shipping'
import PlaceOrder from './screens/PlaceOrder'
import Orders from './screens/Orders'
import Stripe from './screens/Payment/Stripe'
import Gpay from './screens/Payment/Gpay'
import Success from './screens/Payment/Success'
import FeaturedCard from './comps/FeaturedCard'

function App() {
  return (
    <Router>
      <Header />      
      <div className='md:mx-10'>      
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/orders/:id' element={<Orders />} />
        <Route path='/payment/card' element={<Stripe />} />
        <Route path='/orders/success' element={<Success />} />
        <Route path='/pro' element={<FeaturedCard />} />
      </Routes>     
      </div>      
    </Router>
  );
}

export default App;
