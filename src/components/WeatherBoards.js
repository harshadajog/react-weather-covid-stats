import './WeatherBoards.css';
const WeatherBoards = ({weatherData}) => {
    const source = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const lastUpdate = weatherData.lastUpdate ? weatherData.lastUpdate.split("T"):'';
    return (
        <div className="WeatherBoards">
            <div className="Weatherboard-left">
                <h2 className="WeatherCard-city">
                    {weatherData.city}, {weatherData.country}
                </h2>
                <p className="WeatherCard-degrees">{weatherData.temp}°</p>
                <div className="WeatherCard-highlow">
                <p>High: {weatherData.temp_max}°</p>
                <p>Low: {weatherData.temp_min}°</p>
                </div>
                <div className="WeatherCard-icon-container">
                    <img src={source} className="WeatherCard-icon" alt="weather icon" />
                    <p>{weatherData.weather[0].main} as of {new Date().toLocaleTimeString()}</p> {/* new */}
                    <p>Humidity: {weatherData.humidity} %</p>
                </div>    
            </div>
            <div className="Weatherboard-right">
                <h3>COVID Stats as of {lastUpdate[0]}</h3>
                <div className="covid-stats">
                <div className="WeatherCard-detail">
                   <h3>Confirmed: </h3> 
                    <p>{weatherData.confirmed}</p>
                </div>
                <div className="WeatherCard-detail">
                   <h3>Recovered: </h3> 
                    <p>{weatherData.recovered}</p>
                </div>
                </div>
            </div>
        </div>
    )
}
export default WeatherBoards;