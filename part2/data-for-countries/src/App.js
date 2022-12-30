import React from "react";
import {useState, useEffect} from "react"
import axios from 'axios'
import Filter from "./components/Filter"
import Countries from "./components/Countries"

const weatherKey = process.env.REACT_APP_OPENWEATHER_API

const App = () => {

  const [newSearch, setSearch] = useState('')
  const [newCountries, setCountries] = useState([])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleShow = (event) => {
    const showCountry = newCountries.filter
    (country => country.name.common === event.target.previousSibling.textContent )
    setCountries(showCountry)
  }

  const getCountries = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        const countries = response.data.filter(
          country => country.name.common.toLowerCase().includes(newSearch.toLowerCase()) && newSearch !== ""
          )
        setCountries(countries)
        })
  }

  useEffect(getCountries, [newSearch])

  return(
    <div>
      <Filter curSearch={newSearch} handleChange={handleSearch} />
      <Countries country={newCountries} handleShow={handleShow} weatherKey={weatherKey} />
    </div>
  )
}

export default App;
