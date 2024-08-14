// import React, { useEffect, useState } from 'react'

// export default function First() {
  
//     const [city , setCity] = useState([])
//     const [date , setDate] = useState()
//     const [img , setImg] = useState([])
//     const [input , setInput] = useState('mumbai')
  
//     const fetchData =() =>{
//       let url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=3e5bd94c5f5264f91e9a32741d46a3ab`
//       fetch(url).then((res) => res.text())
//       .then((data) => JSON.parse(data))
//       .then((takeData) =>{
//          setCity(takeData)
//          if(takeData.weather && takeData.weather.length > 0){
//            const imgSet = takeData.weather[0]
//            setImg(imgSet)
//          }
//       })
//       console.log(city)
//     }
    
//     useEffect(()=>{
//       let timeOut = setTimeout(()=>{
//         fetchData()
//       },1000)
//       return () => clearTimeout(timeOut)
//       },[input])


//   return (
//     <div>

//     </div>
//   )
// }
