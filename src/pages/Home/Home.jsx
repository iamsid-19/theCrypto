import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'
const Home = () => {
  const { allCoins, currency } = useContext(CoinContext);
  const [displayCoins, setDisplayCoins] = useState([]);
  const [input,setInput] = useState('');
  useEffect(() => {
    setDisplayCoins(allCoins)
  }, [allCoins])

  function handleInput(event)
  {
    setInput(event.target.value);
    if(event.target.value === "")
    {
      setDisplayCoins(allCoins);
    }
  }
  const searchHandler = async (event)=>{
    event.preventDefault();
    const coin = await allCoins.filter((item)=>{
      return item.name.toLowerCase().includes(input.toLocaleLowerCase())
    })
    setDisplayCoins(coin);
  }
  
  return (
    <div className='home'>
      <div className="hero">
        <h1>Largest<br /> Crypto Marketplace</h1>
        <p>Welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about Cryptos.</p>
        <form onSubmit={searchHandler}>
          <input list='list' type="text" placeholder='Search cryto...' onChange={handleInput} value={input} required />
          <datalist id='list'>{allCoins.map((item,idx)=>(<option key={idx} value={item.name}/>))}</datalist>
          <button type='submit'>Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>
        {
          displayCoins.slice(0, 10).map((item, index) => (
            <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>

              <div>
                <img src={item.image} alt="" />
                <p>{item.name +"-" + item.symbol}</p>
              </div>
              <p>{currency.Symbol} {item.current_price.toLocaleString()}</p>
              <p className={item.price_change_percentage_24h>0?"green":"red"}>{Math.floor(item.price_change_percentage_24h*100)/100}</p>
              <p className="market-cap">{currency.Symbol} {item.market_cap.toLocaleString()}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home