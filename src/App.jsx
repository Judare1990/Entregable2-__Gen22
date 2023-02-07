import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import WeatherCard from "./components/WeatherCard";

function App() {

  const [coords, setcoords] = useState()

  const [weather, setweather] = useState()

  const [temperature, settemperature] = useState()
  
  const [isLoading, setisLoading] = useState()

  useEffect(() => {

    const success= pos => {

      const obj= {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }

      setcoords(obj);

    }

    navigator.geolocation.getCurrentPosition(success)
  }, [])
console.log(weather)
useEffect(() => {

  if(coords){

    const APIKey= '7137db7bd5bc9848851f8ade671f3cf9'
    const url= `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKey}`

    axios.get(url)
      .then(res => {
        setweather(res.data)
        const obj = {
          celsius: (res.data.main.temp - 273.15).toFixed(1),
          farenheit: ((res.data.main.temp - 273.15) * 9/5 + 32).toFixed(1)
        }
        settemperature(obj)
      })
      .catch(err => console.log(err))
      .finally(() => setisLoading(false))

  }

}, [coords])

  return (
    <div className="App">
      {
        isLoading ?
      <h1>Loading...</h1>
      :
      <WeatherCard
      weather={weather}
      temperature={temperature}
      />
    }
    </div>
  )
}

export default App
