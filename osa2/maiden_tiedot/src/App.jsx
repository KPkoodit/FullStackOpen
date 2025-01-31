/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_API_KEY

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const CountryList = ({selectedCountries, seeInfo}) => {
  return (
    <div>
      {selectedCountries.map((country) => 
        <div key={country.name.common}> {country.name.common} <Button handleClick={() => seeInfo(country)} text='show'></Button></div>
      )}
    </div>
  )
}

const CountryDetails = ({selectedCountries}) => {
  return (
    <div>
      <h2>{selectedCountries[0].name.common}</h2>
        <p>capital {selectedCountries[0].capital}</p>
        <p>area {selectedCountries[0].area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.values(selectedCountries[0].languages).map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={selectedCountries[0].flags.png} alt="flag of the country"/>
        <Weather country={selectedCountries[0]}/>
    </div>
  )
}

const SearchBar = ({searchword, handleChange}) => {
  return (
    <div>
      <p>find countries <input value={searchword} onChange={handleChange} /></p>
    </div>
  )
}

const Weather = ({country}) => {
  const [iconId, setIconId] = useState(null)
  const [celcius, setCelcius] = useState(null)
  const [wind, setWind] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}`)
        const data = await response.json()
        setIconId(data.weather[0].icon)
        setCelcius((data.main.temp - 273.15).toFixed(2))
        setWind(data.wind.speed)
      } catch (error) {
        console.log('Error fetching weather data', error)
      }
    }

    fetchWeather()
  }, [country])

  return (
    <div>
      <h3>Weather in {country.capital}</h3>
      <p>temperature {celcius} celcius</p>
      <img src={`https://openweathermap.org/img/wn/${iconId}@2x.png`} alt="Weather icon"/>
      <p>wind {wind} m/s</p>
    </div>
  )
}

function App() {
  const [searchword, setSearchword] = useState('')
  const [countries, setCountries] = useState(null)
  const [selectedCountries, setSelectedCountries] = useState([])

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  useEffect(() => {
    if(searchword && countries){
      const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchword.toLowerCase())
      )
      setSelectedCountries(filteredCountries)
    }
  }, [countries, searchword])

  const handleChange = (event) => {
    setSearchword(event.target.value)
  }

  const seeInfo = (country) => {
    const array = []
    const countryArray = array.concat(country)
    setSelectedCountries(countryArray)
  }

  if (selectedCountries.length > 10 && searchword){
    return (
      <div>
        <SearchBar searchword={searchword} handleChange={handleChange} />
        Too many matches were found, please adjust the filter
      </div>
    )
  }

  if (selectedCountries.length < 10 && selectedCountries.length > 1){
    return (
      <div>
        <SearchBar searchword={searchword} handleChange={handleChange} />
        <CountryList selectedCountries={selectedCountries} seeInfo={seeInfo} />
      </div>
    )
  }

  if (selectedCountries.length === 1) {
    return (
      <div>
        <SearchBar searchword={searchword} handleChange={handleChange} />
        <CountryDetails selectedCountries={selectedCountries}/>
      </div>
    )
  }

  return (
    <div>
        <SearchBar searchword={searchword} handleChange={handleChange} />
    </div>
  )
}

export default App
