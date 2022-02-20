import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import './App.css';
import WeatherBoards from './components/WeatherBoards';


const API_KEY = 'afce9c19315e0f677a65e4c48c9cff0c';
const RAPID_API_KEY = '59fb0afc09msh402f2e96ec9c16dp133177jsn023546ee8681';

const initialValues = {
  weather:'',
  city: '',
  country: null,
  humidity: '',
  temp: 0,
  confirmed: 0,
  recovered: 0,
  critical: 0,
  deaths: 0,
  lastUpdate: null
}

function App() {
  const [state, setState] = useState(initialValues);
  const getWeatherData = async(city) => {
    const API_CALL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`; 
    await fetch(API_CALL)
    .then(handleErrors)
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      setState({
        ...state,
        weather: data.weather, 
        icon: data.weather[0].icon,
        city: data.name, 
        country: data.sys.country, 
        humidity: data.main.humidity,
        temp: Math.floor(data.main.temp),
        temp_max: Math.floor(data.main.temp_max),
        temp_min: Math.floor(data.main.temp_min),
      })  
  })
  }

  // const getCovidData = async() => {
  //   console.log("Inside getCovid data", state);
  //   const COVID_API_CALL = `https://covid-19-data.p.rapidapi.com/country/code?code=${state.country}`;
  //    await fetch(COVID_API_CALL, {
  //       "method": "GET",
  //       "headers": {
  //         "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
  //         "x-rapidapi-key": RAPID_API_KEY
  //       }
  //     })
  //     .then(response => response.json()) 
  //     .then(data => {
  //       console.log(data)
  //       setState({
  //         ...state,
  //         confirmed: data[0].confirmed,
  //         recovered: data[0].recovered,
  //         critical: data[0].critical,
  //         deaths: data[0].deaths
  //       })
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }

useEffect(() => {
  if(state.country) {    
    console.log("Inside getCovid data", state.country);
    const COVID_API_CALL = `https://covid-19-data.p.rapidapi.com/country/code?code=${state.country}`;
    console.log("Calling COVID API"); 
    fetch(COVID_API_CALL, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
          "x-rapidapi-key": RAPID_API_KEY
        }
      })
      .then(response => response.json()) 
      .then(data => {
        console.log(data)
        setState({
         ...state,
          confirmed: data[0].confirmed,
          recovered: data[0].recovered,
          critical: data[0].critical,
          deaths: data[0].deaths,
          lastUpdate: data[0].lastUpdate
        })
      })
      .catch(err => {
        console.error(err);
      });

  }
}, [state.country])

  const handleErrors =(response) => {
    if(!response.ok){
      throw new Error(response.statusText)
    }
    return response;
  }

  return (
    <div className="App">
      <header>
        React Weather App
      </header>
      <SearchBar getWeatherData={getWeatherData}  />
      {state.city && state.weather &&
      <WeatherBoards weatherData={state} />
      }
    </div>
  );
}

export default App;
