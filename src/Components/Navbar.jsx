import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../assets/logo.png'
import arrow from '../assets/arrow_icon.png'
import { CoinContext } from '../context/CoinContext'
const Navbar = () => {
  const {setCurrency}=useContext(CoinContext)
  const handleCurrency =(event)=>{
    switch(event.target.value){
      case "usd":
        {
          setCurrency({name:'usd',symbol:'$'})
          break;
        }
        case "inr":
          {
            setCurrency({name:'inr',symbol:'₹'})
            break;
          }
          case "eur":
            {
              setCurrency({name:'eur',symbol:'€'})
              break;
            }
            default:{
              setCurrency({name:'usd',symbol:'$'})
            }
    }
  }
  return (
    <div className='navbar'>
     <img src={logo} alt="" className='logo'/>
     <ul>
        <li>Home</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
     </ul>
     <div className="nav-right">
        <select onChange={(event)=>handleCurrency(event)}>
        <option value="usd">USD</option>
        <option value="inr">INR</option>
        <option value="eur">EUR</option>
        </select>
        <button>Sign Up <img src={arrow} alt="" /></button>
     </div>
        

    </div>
  )
}

export default Navbar