import React from 'react'
import './Login.css'
import Account from './Account.mp4'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { API_URL } from '../App';
import Swal from 'sweetalert2'

export default function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, reset,setError, clearErrors, formState: { errors } } = useForm();
    
    const onSubmit=(data)=>{
        console.log(data)

        const api_url="http://127.0.0.1:8000/verify/"
        fetch(api_url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data)
        })
        .then(response=>{
            if (response.ok){
                Swal.fire({
                    title: "Success",
                    text : 'Login Successfull',
                    icon: 'success',
                    confirmButtonText:"Ok",
                    showConfirmButton:true,
                    customClass:{
                        confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    }
                    }).then(result=>{
                        if (result.isConfirmed){
                            console.log(data)
                            // Cookies.set('Token',data.Token,{expires:30/1440})
                            localStorage.setItem('username',data.username);
                            navigate('/success');
                        }
                    });

            }
            else if (response.status===403){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Invalid Credentials.....",
                  });
                navigate('/failed');
                  
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                  });
                
            }
        })


    }

  return (
    <>
    <div style={{"height":"100vh","display":"flex","justifyContent":"center","alignItems":"center"}}>
<div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100" style={{'width':'40%','height':'80%','opacity':'88%'}}>
        <video autoPlay muted loop className="login-logo" style={{'marginLeft':'30%','width':"40%",'height':"40%"}}>
          <source src={Account} type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">Username :</label>
            <input type="text" {...register('username')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  placeholder="Enter Username" required />
        </div>
        <div style={{'paddingTop':'5px'}}>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900">TOTP :</label>
            <input type="text" {...register('code')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter TOTP" required />
        </div>
        <div style={{'display':'flex','justifyContent':'center','paddingTop':'5%'}}>
        <button type="submit" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">Login</button>
        </div>
        </form>
        <div class="block mb-2 text-sm font-medium text-gray-900" style={{'paddingTop':'3%'}}>To Set Up Authenticator <a href='/register' style={{"color":'purple'}}>Click Here</a></div>
        </div>

</div>
</div>

    </>
  )
}
