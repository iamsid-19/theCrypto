import { createContext, useEffect, useState } from "react";
export const CoinContext = createContext();


//creating Provider function
const coinProviderContext = (props) => {
    const [allCoin, setAllCoin] = useState([]);
    const [curreny, setCurrency] = useState({
        name: 'usd',
        symbol: '$'
    })
    const fetchAllCoin = async () => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-dTLuqMNkMmjCSQ53S8wfF37q' }
        };

        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${curreny.name}`, options)
            .then(res => res.json())
            .then(res => setAllCoin(res))
            .catch(err => console.error(err));
    }
    useEffect(() => {
        fetchAllCoin();
    }, [curreny])
    const contextValue = {
        allCoin, setCurrency, curreny
    }
    return (
        <CoinContext.Provider value={contextValue}>
            {
                props.children
            }
        </CoinContext.Provider>
    )
}
export default coinProviderContext;