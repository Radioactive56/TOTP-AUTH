import React from 'react'
import Failure from './Failure.mp4';

export default function Failed() {
  return (
    <>
    <div>Failed</div>
    <div style={{'height':'100vh',"display":"flex","justifyContent":"center","alignItems":"center"}}>
        <video autoPlay loop muted style={{"width":"50%","height":"80%"}}>
            <source src={Failure} type='video/mp4'></source>
        </video>
    </div>
    </>
)
}
