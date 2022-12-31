import React from "react"
import {useState, useEffect} from "react"
import axios from "axios"
import Languages from "./Languages"

const CountryDropDown = ({country, handleShow}) => (
    <div>
      <label>{country.name.common}</label>
      <button onClick={handleShow}>show</button>
    </div>
)

const SingleCountry = ({country, weatherKey}) => {

  const [isBusyReport, setBusyReport] = useState(true)
  const [newWeather, setWeather] = useState({})

    const getWeather = () => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country[0].name.common}&units=metric&APPID=${weatherKey}`)
        .then(response => {
          console.log(response.data)
          setWeather(response.data)
          setBusyReport(false)
        })
    }

    useEffect(getWeather, [])

    if (isBusyReport === false) return(
      <div>
        <h1>{country[0].name.common}</h1>
        <p>capital {country[0].capital}</p>
        <p>area {country[0].area}</p>
        <Languages languages={country[0].languages} />
        <img src={country[0].flags.png} alt={`Flag of ${country[0].name.common}`} />
        <h1>Weather in {country[0].name.common}</h1>
        <p>temperature {newWeather.main.temp} celsius </p>
        <img src={`http://openweathermap.org/img/wn/${newWeather.weather[0].icon}@2x.png`} alt={`Visuals of weather in ${country[0].name.common}`} />
        <p>wind {newWeather.wind.speed} m/s</p>
      </div>
      )

}

const Countries = ({country, handleShow, weatherKey}) => {
  if (country.length > 10) return <p>Too many matches, specify another filter</p>
  else if (country.length !== 1) {
    return country.map((country, index) => <CountryDropDown key={index} country={country} handleShow={handleShow} />)
  } else {
  return <SingleCountry country={country} weatherKey={weatherKey} />
  }
}

export default Countries