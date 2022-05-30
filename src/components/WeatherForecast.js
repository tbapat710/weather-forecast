import React, { useEffect } from 'react'

const WeatherForecast = (props) => {
    const {latitude,longitude}=props;

    useEffect(()=>{
        async function fetchData(){
            const resp=await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=bf34c95c549370af5a47e8d9ab56bda6`);
            console.log(resp);
            const data=await resp.json();
            console.log(data);
        }
        fetchData()

    },[latitude])
  return (
    <>
      <p>{latitude}</p>
    </>
  )
}

export default WeatherForecast
