'use client'
import React, { useEffect, useState } from 'react'
import { UseUser } from '../Context/shoppingContext'
import { useRouter } from 'next/navigation'

function SignIn() {

const router = useRouter()
    const {setUsername} = UseUser()

const [input,setInput] = useState({
    username: '', password: ''
})

const [error,setError] = useState({
    username: '', password: ''
})

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const {name,value}= e.target;
    
    setInput(prev=>
        ({...prev, [name]: value })
    )   
}

console.log(input)


const validateInput =()=>{
    const usernameRegex = /^.{6,}$/
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const newErrors = {
    username: '', password: ''
    }

    if (!usernameRegex.test(input.username)){
        newErrors.username = 'Username must be more than 6 chracters'
    }

    if (!passwordRegex.test(input.password)){
        newErrors.password=  'Password must be more than 7 characters and contain at least one capital letter, one number, and one special character'
    }

    return newErrors
}

useEffect(() => {
    const handleLocalStorage = () => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('username', JSON.stringify(input.username))
        }
    }

    // Only run when username is set during form submission
    if (input.username) {
        handleLocalStorage()
    }
}, [input.username])

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setUsername(input.username);


    const errorMsg = validateInput();
    if (errorMsg.username || errorMsg.password){
        setError(errorMsg)
        return
    }

    router.push('/home')

  const response = await fetch('pages/api/submit',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(input)
   })

const result = await response.json();
    console.log('form submitted:', result)    
}

// 
//     const response = await fetch('pages/api/submit', { 
//         method: 'POST', 
//         headers: { 'Content-Type': 'application/json' },
//          body: JSON.stringify(input) 
//         })
//          if (response.ok) { const result = await response.json(); 
//             console.log('form submitted:', result); router.push('/home') 
//         } else {
//              const result = await response.json(); 
//              setError({ username: result.message, password: '' 

//              }) 
//             }


//     // If successful
//     const result = await response.json();
//     setUsername(input.username);
//     localStorage.setItem('username', JSON.stringify(input.username));
//     console.log('form submitted:', result);
//     router.push('/home');
          
//          } catch (err) {
//              console.error('Error:', err);
//               setError({ username: 'An unexpected error occurred', password: '' }) 
//             } 
        
//         }}

  return (
    <div className='w-full pt-8'>

        <h1 className='text-4xl text-center mb-8'>Sign In</h1>
        <div className='md:w-[30%] sm: w-[70%] m-auto border border-black h-[80%] px-8 leading-10 rounded-lg'>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col my-6'>
                    <label htmlFor='username'>Username</label>
                    <input onChange={handleChange} name='username' value={input.username} type='text'
                     placeholder='Input Username' className='border border-black px-4 rounded-lg'></input>
                     <p className='mt-4 text-red-600 italic text-sm'>{error.username}</p>
                </div>

                <div className='flex flex-col my-6'>
                    <label htmlFor='username'>Password</label>
                    <input onChange={handleChange} name='password' value={input.password} type='password'
                     placeholder='Input password' className='border border-black px-4 rounded-lg'></input>
                     <p className='mt-4 text-red-600 italic text-sm'>{error.password}</p>
                </div>

                <div className='my-6'>    
                    {/* <Link href='/home'> */}
                    <button type='submit' className='border border-black rounded-lg w-[120px]'>Sign In</button>
                    {/* </Link> */}
                </div>
            </form>
        </div>

        

        <div className='md:w-[30%] sm: w-[70%] m-auto my-8'>
        <p><a href='/' className='text-blue-700 hover:underline'>Forget Password?</a></p>
         <p>Dont have an account yet? <a href='/signup' className='text-blue-700 hover:underline'>Sign Up</a> here</p>
        </div>

    </div>
  )
}

export default SignIn