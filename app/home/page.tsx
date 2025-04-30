'use client'
import React, { useEffect, useState } from 'react'
import { UseUser} from '../Context/shoppingContext'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type ApiDataType ={
  id:number;
     title: string; 
     price: number;
     decription: string;
      image: string;
    }

const Page:React.FC=()=> {
  const {username,logout, addToCart} = UseUser()
console.log(username)
const router = useRouter()

const handleLogout= ()=>{
  router.push('/login')
  logout();
  
}

const handleCart = (item: ApiDataType )=>{
  addToCart(item);
}

const [apiData, setApiData] = useState<ApiDataType[]|null>(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')
const [index, setIndex] = useState(0)

const [currentPage,setCurrentPage]= useState(1)    
const perPage = 6
const lastElement = currentPage * perPage
const firstElement = lastElement - perPage

const handlePrev = ()=>{
  if ( currentPage <= index) {
    setCurrentPage(currentPage - 1)
  }
}

const handleNext = ()=>{
  if ( currentPage > 0) {
    setCurrentPage(currentPage + 1)
  }
}


useEffect(()=>{
  const fetchdata = async ()=>{
    try{
    const response = await fetch('https://fakestoreapi.com/products')

    if (!response.ok) {
      throw new Error('network error was not ok')
    }
    
    const data: ApiDataType[] = await response.json();
    
    setIndex( Math.ceil(data.length/perPage)) 

    const slicedData = data.slice(firstElement,lastElement)

    console.log(data)
    setApiData(slicedData)
    setLoading(false)

    
    }

    

    catch(error){
      setError((error as Error).message)
    setLoading(false)
    }
  };

  fetchdata();
})


  return (
      <div className='w-full'>
            <Navbar/>

            <div className='w-[80%] m-auto flex items-center justify-end gap-4 mt-6 mb-6'>
                <p className='text-xl '>Welcome {username}! </p>
                <button onClick={handleLogout} className='bg-black text-white rounded-md w-24 h-8 p-1 hover:transition-transform hover:translate-x-2'>Logout</button>
            </div>

          <div className='w-[80%] m-auto'>

            <div className=''>
              {loading && <p>loading...</p>}
              {error && <p>Error: {error}</p>}
              <div className='grid md:grid-cols-3 md:gap-6 sm: grid-cols-2 sm: gap-6 mt-4 '>
              {apiData && apiData.map((item)=>( 
                <div key={item.id} className='border border-black rounded-2xl h-[60%] p-3 sm: mt-4 md:mt-0'>
                     
                  <div className='relative h-full w-full'>
                  <Image alt='' src={item.image} className='object-fill rounded-tr-2xl rounded-tl-2xl w-full h-[80%]' width={400} height={400}></Image>
                    
                    </div>                    

                    <div className='md:flex md:items-center md:justify-center sm: block md:w-[90%] m-auto sm: w-full sm: text-left'>
                      <div className='md:w-[70%] sm: w-full mt-2 '>
                        <h3>{item.title}</h3>
                        <h3 className=''><b>Price:</b> ${item.price}</h3>
                      </div>

                      <button className='md:w-[30%] sm: w-[80%]  bg-black text-white font-semi-bold p-1 rounded-lg' onClick={()=>handleCart(item)}>Add to Cart</button>
                    </div>
                </div>
              ))}
              </div>

              <div className='flex md:w-[80%] sm: w-full m-auto sm: mt-12 md:mt-0'>
            <button id='btnPrev' onClick={()=>handlePrev()} className={`h-12 border border-gray-400 font-semibold text-[#F4511E] py-2 px-4 rounded-tl-md rounded-bl-md ${lastElement === perPage ? "bg-gray-200 text-gray-400" : ""}`} disabled={lastElement === perPage}>
              Prev</button>
              {[...Array(index)].map((_, i) =>
                 ( <button key={i+1} onClick={() => setCurrentPage(i+1)} 
                 className={`h-12 border border-gray-400 font-semibold text-[#F4511E] py-2 px-4
                  ${currentPage === i+1 ? "bg-[#F4511E] text-gray-50 font-bold" : "bg-transparent"}`}>{i+1}</button> 
                  ))}
            <button id='btnNext' onClick={()=>handleNext()} className={`h-12 border border-gray-400 font-semibold text-[#F4511E] py-2 px-4 rounded-tr-md rounded-br-md ${lastElement === index ? "bg-gray-200 text-gray-400" : ""} `} disabled={lastElement === index}>
              Next
            </button>

          </div>
           
            </div>
            
        </div>
    </div>
  
  )
}

export default Page