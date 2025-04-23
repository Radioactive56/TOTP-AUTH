import React ,{ useState, useEffect } from "react";
import { QRCodeCanvas } from 'qrcode.react';
import Swal from 'sweetalert2'
import { API_URL } from "../App";


export default function Register() {

  const [uri,seturi]=useState(null);
  const [secret,setsecret] = useState(null);

  const handleClick =()=>{

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username.length==0 || password.length==0){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Username or password field cannot be empty..",
      });
    }
    else{
      console.log(username);
      console.log(password)

      const api_url=`${API_URL}/generate/${username}/${password}/`

      fetch(api_url,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
      }
      })
      .then(response=>{
        if (response.ok){
          return response.json();
        }
        else{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error in finding the user...",
          });
          throw new Error('error!!!!!')
        }
      })
      .then(data=>{
        setsecret(data.secret);
        seturi(data.otp_uri);
      })
    }
  }

  return (
    <div style={{'height':'100vh','width':'100vw','display':'flex','justifyContent':'center','alignItems':'center'}}>
      <div style={{'display':'flex','flexDirection':'column'}}>
      <label>Enter Username : </label>
      <input type="text" id='username' />
      <label>Enter password : </label>
      <input type="password" id='password' />
      <div style={{'display':'flex','justifyContent':'center','paddingTop':'5%'}}>
        <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2" onClick={handleClick}>Generate QR</button>
      </div>
      </div>
      {uri && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Scan this QR with Microsoft Authenticator</h3>
          <QRCodeCanvas value={uri} size={200} />
        </div>
      )}
    </div>

  )
}
