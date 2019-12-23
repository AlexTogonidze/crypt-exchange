import React, { useState, useEffect } from 'react';
import Row from './row';
import { baseApiURL, ApiKey, currency } from '../globalconfig';

const Dashboard = () => {
    const [cryptoData, setCryptoData] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const fetching = () => {
            fetch(`${baseApiURL}?key=${ApiKey}&ids=BTC,ETH,XRP,DASH,BCH,LTC,EOS&interval=1h,30d&convert=${currency}`)
            .then(response => response.json())
               .then(data => 
                   {
                       setCryptoData(data);  
                       setIsFetching(false);
                   }
                );
           };

           fetching();

       
       //Refetch every 10 seconds
       const apiInterval =  setInterval(
            () => {
                setIsFetching(true);

                fetching();
            }, 10000
        );

        return () => {
            clearInterval(apiInterval);
        };
    }, [])


    return(
        <div className='container'>
            <h1>Crypto Excange Rates</h1>

            <div className='row-container' >
                {cryptoData.map(x => 
                    <Row 
                      logo={x.logo_url}
                      currency={x.name}
                      exchange={x.price}
                      price_date={x.price_date}
                      key={x.id}
                      thirtyDayData={x['30d']}
                    />)}

                {isFetching &&<div className='overlay'>
                    <img src={require('../assets/img/spinner.png')} alt='spinner' />
                </div>
                }
            </div>
        </div>
    )
}

export default Dashboard;