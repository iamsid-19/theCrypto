import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
    const [allCoins, setAllCoins] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        Symbol: "$",
    });

    
    const fetchAllCoins = async () => {
        if (!currency || !currency.name) return; 

        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
                {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        'x-cg-demo-api-key': 'CG-dTLuqMNkMmjCSQ53S8wfF37q',
                    },
                }
            );
            const data = await response.json();
            setAllCoins(data);
        } catch (err) {
            console.error("Error fetching coins:", err);
        }
    };

    useEffect(() => {
        fetchAllCoins();
    }, [currency]); 

    const contextValue = {
        allCoins,
        currency,
        setCurrency,
    };

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    );
};

export default CoinContextProvider;
