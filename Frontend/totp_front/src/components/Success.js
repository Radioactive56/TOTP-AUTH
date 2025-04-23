import React from 'react'
import win from './win.mp4'

export default function Success() {
    const username = localStorage.getItem('username')
  return (
    <>
    <h1>Success ,{username}</h1>
    <div style={{'height':'100vh','display':'flex','justifyContent':'center',alignItems:'center'}}>
        <video autoPlay loop muted style={{'height':'50%','width':'50%'}}>
            <source src={win} type='video/mp4'></source>
            Your browser doesnt support videos.
        </video>
    </div>
    </>
  )
}
