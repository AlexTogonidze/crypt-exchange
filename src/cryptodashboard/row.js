import React from 'react';
import Tooltip from 'rc-tooltip';


const OverlayItem = (props) => {

    return(
        <div className='statistics'>
            <h3>30 Day Info</h3>
            {
                Object.entries(props.data).map(([key, val]) => 
                    <p key={key}>{key.replace(/_/g, ' ')}: {val}</p>
                )
            }
        </div>
    )

}

const Row = (props) => {

    return (
        <div className='main-row'>
            <div className='left-block'>
                <img src={props.logo} alt={`${props.currency} logo`} />
                <span>{props.currency}</span>
            </div>
            
            <div className='right-block'>
               
                <Tooltip 
                placement='right'
                trigger={['hover']} 
                destroyTooltipOnHide={true}
                overlayClassName='statistics'
                overlay={
                  <OverlayItem data={props.thirtyDayData} />
                }>
                <img src={require('../assets/img/line-chart.png')} />
  </Tooltip>
            <p>{props.exchange} $</p>
            
            </div>
          
        </div>
    )
}


export default Row;