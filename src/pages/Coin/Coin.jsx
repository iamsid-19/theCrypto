import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import Linechart from "../../Components/Linechart/Linechart";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [loadingCoin, setLoadingCoin] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const { currency } = useContext(CoinContext);


  const fetchCoinData = async () => {
    try {
      const res = await fetch(`https://thecrypto.onrender.com/api/coin/${coinId}`);
      const data = await res.json();
      setCoinData(data);
    } catch (err) {
      console.error("Error fetching coin data:", err);
    } finally {
      setLoadingCoin(false);
    }
  };


  const fetchHistoricalData = async () => {
    if (!currency || !currency.name) {
      console.error("Currency is undefined.");
      return;
    }
    try {
      const res = await fetch(
        `https://thecrypto.onrender.com/api/market-chart/${coinId}/${currency.name}&interval=daily`
      );
      const data = await res.json();
      setHistoricalData(data);
    } catch (err) {
      console.error("Error fetching historical data:", err);
    } finally {
      setLoadingChart(false);
    }
  };


  useEffect(() => {
    setLoadingCoin(true);
    setLoadingChart(true);
    fetchCoinData();
    fetchHistoricalData();
  }, [coinId, currency]);


  if (loadingCoin || loadingChart) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }


  return (
    <div className="coin">
      <div className="coin-name">
        <img src={coinData.image.large} alt={coinData.name} />
        <p>
          <b>
            {coinData.name} ({coinData.symbol.toUpperCase()})
          </b>
        </p>
      </div>
      <div className="coin-chart">
        <Linechart historicalData={historicalData} />
      </div>
      <div className="coin-info">
        <ul>
          <li>
            Crypto Market Rank
          </li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
        <li>
            Current Price
          </li>
          <li>{currency.Symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>{currency.Symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour high</li>
          <li>{currency.Symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour low</li>
          <li>{currency.Symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
        </ul>
      </div>
    </div>
  );
};

export default Coin;
