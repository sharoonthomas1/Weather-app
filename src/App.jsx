import React, {  useEffect, useState } from 'react'
import { WeatherDisplay } from './Components/WeatherImage'


function App() {
    const [city , setCity] = useState([])
    const [img , setImg] = useState([])
    const [weatherDisplay , setWeatherDisplay] = useState('')
    const [input , setInput] = useState('New Delhi')
  
    const fetchData = () =>{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=3e5bd94c5f5264f91e9a32741d46a3ab`
      fetch(url).then((res) => res.text())
      .then((data) => JSON.parse(data))
      .then((takeData) =>{
         setCity(takeData)
         if(takeData.weather && takeData.weather.length > 0){
           const imgSet = takeData.weather[0]
           setImg(imgSet)
         }
         //weatherDisplay
          let weatherImage = takeData.weather[0].main;
           switch (weatherImage) {
            case 'Clear':
               setWeatherDisplay('https://images.unsplash.com/photo-1620355058000-6d5d21504db3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2xlYXIlMjBza3l8ZW58MHx8MHx8fDA%3D')
               break;
               case 'Clouds':
               setWeatherDisplay('https://images.unsplash.com/photo-1509635022432-0220ac12960b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFpbnl8ZW58MHx8MHx8fDA%3D')
               break;
               case 'Haze':
               setWeatherDisplay('https://plus.unsplash.com/premium_photo-1667926195926-b210e1963e2f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEhhemV8ZW58MHx8MHx8fDA%3D')
               break;
            default:
               setWeatherDisplay(`https://images.unsplash.com/photo-1582324982598-981139657fa6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJhaW55fGVufDB8fDB8fHww`)
               break;
           }
      })
   }

    
    useEffect(()=>{
        fetchData()
      },[input])


      //Date and time
      const [dateTime, setDateTime] = useState(new Date());

      useEffect(() => {
        const timer = setInterval(() => {
          setDateTime(new Date());
        }, 1000);
    
        return () => clearInterval(timer);
      }, []);
    
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        day: '2-digit',
        month: 'short',
      }).format(dateTime);
    
      const formattedTime = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(dateTime);
    
  

  return (
    <div className=' px-0'>
         {/* <h1 id="heading" className='text-center display-6 font-bold'>Weather App</h1> */}
      <div >
        <div>
            <div id='weatherApp' className='row mx-0 ' style={{backgroundImage:`url(${weatherDisplay})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
                <div className='col-12 col-lg-5 p-4  flex justify-center items-center ' id="otherSide">
                      <div id='other-content' className='w-[80%]'>
                      <div id='form-control' className='flex align-items-center justify-between mb-3 mb-lg-5'>
                          <p className='text-white fs-5 font-semibold'>Your city</p>
                          <input placeholder='Enter your city' className="py-2 px-3 fs-5 rounded-md w-[80%] "  type='search' value={input} onChange={(e) => setInput((e.target.value).toLowerCase())}/>
                       </div>
                      <div className='fs-1 text-center fw-medium  text-white d-flex align-items-center justify-center mt-2'>
                      <span  className="material-symbols-outlined fs-1 me-2">location_on</span>
                      {city ? city.name : ''}
                      <div className='ms-3 fs-5 fw-medium text-white'>({city.sys?.country})</div>
                     </div>
                        <ul id="ul" className='list-unstyled mt-5'>
                           <li className='d-flex justify-between'>
                              <div className='fs-5 fw-medium'>WIND</div>
                              <div className='fs-6 fw-fw-medium'>{city.wind?.speed.toPrecision(1)}  km/h</div>
                           </li>
                           <li className='d-flex justify-between'>
                              <div className='fs-5 fw-medium'>HUMIDITY</div>
                              <div className='fs-6 fw-fw-medium'>{city.main?.humidity}%</div>
                           </li>
                           <li className='d-flex justify-between'>
                              <div className='fs-5 fw-medium'>VISIBILITY</div>
                              <div className='fs-6 fw-fw-medium'>{((city.visibility) / 1000).toFixed(1)}<small> CM</small></div>
                           </li>
                           <li className='d-flex justify-between'>
                              <div className='fs-5 fw-medium'>PRESSURE</div>
                              <div className='fs-6 fw-fw-medium'>{((city.main?.pressure))} MB</div>
                           </li>
                        </ul>
                      </div>
                 </div>
                 <div className='col-12  col-lg-7 p-4 p-lg-5 position-relative flex justify-center items-center' id='oneSide'>
                     <div>
                        <h1 className='mt-2 fs-2 fw-medium' style={{color:'#8496fe',}}> {formattedDate}</h1>
                        <p className='mt-1 fs-5 font-semibold text-gray-400'>{formattedTime}</p>
                        <div id="temps" className='d-flex flex-column justify-center mt-lg-5 mt-3'>
                           <div  className='mb-4 row row-cols-lg-3'>
                               <div id='temp_sky' className='col'>
                                   <h1 className='display-6 m-lg-3 ms-0 fw-medium text-center text-gray-100'>{img?.main}</h1>
                               </div>
                               <div  id='temp_sky' className='col'>
                                    <img className='m-lg-3' src={`https://openweathermap.org/img/wn/${img?.icon}@2x.png`} style={{width:'130px'}}/>
                               </div>
                               <div  id='temp_sky' className='col'>
                                  <div className='m-lg-3'>
                                     <h1 className='fs-4 fw-medium'  style={{color:'#8496fe',}}>Temperature</h1>
                                    <h1 className='display-3 fw-medium text-center text-gray-100'>{((city.main?.temp) - 274.15).toFixed(0)}°C</h1>
                                  </div>
                               </div>
                           </div>
                           <div className='text-center flex mt-lg-4 mt-2'> 
                                <button className='text-white rounded-2 w-[50%] m-2 fs-6 border border-start p-2'>High {((city.main?.temp_min) - 274.15).toFixed(0)}°C</button>
                                <button className='text-white w-[50%] rounded-2 m-2 fs-6 border border-start p-2'>Low  {((city.main?.temp_max) - 274.15).toFixed(0)}°C</button>
                           </div>
                        </div>

                     </div>
                 </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default App
