import { useState } from "react"
import axios from "axios"
import PropTypes from 'prop-types';
import { format } from "date-fns"
import { BsSearch } from "react-icons/bs"
import { BiDroplet } from "react-icons/bi"
import { CiTempHigh } from "react-icons/ci"
import { FaWind } from "react-icons/fa"

import "./TodayWeather.css"



const TodayWeather = ({ sendLocation }) => {

    TodayWeather.propTypes = {
        sendLocation: PropTypes.func.isRequired,
      };

    const [data, setData] = useState({})
    const [location, setLocation] = useState("")
  
    const url = `https://api.weatherapi.com/v1/forecast.json?key=1c7609957a4c441d9e980524230508&q=${location}&days=3&aqi=no&alerts=no`


    const searchLocation = () => {  
        axios.get(url).then((response) => {
            const responseData = response.data
            setData(responseData)
            console.log(responseData)
            sendLocation(location)             
        })
        setLocation("")
    }

    return (
        <div className="weather-body">
            <div className="location-body">
                <input 
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}  
                    placeholder="Enter Location"
                />
                <BsSearch 
                    onClick={searchLocation} 
                    className="search-icon"
                />
            </div>
            <div>
                {data.location && data.location.localtime && (
                    <div className="location-time">
                        <p>{format(new Date(data.location.localtime), "dd. MMMM yyyy")}</p>
                        <p>Local time: {format(new Date(data.location.localtime), "HH:mm")}</p>
                    </div>
                )}
                {data.location && (
                    <div className="location-city">
                        <h2>{data.location.name}</h2>
                        <h2>, {data.location.country}</h2>
                    </div>
                )}
                {data.current && <p className="location-text">{data.current.condition.text}</p>}

                {data.current && (
                    <div className="location-temperature">
                        <img src={data.current.condition.icon} alt="Weather Icon" />
                        <h3>{data.current.temp_c}°C</h3>
                        <div>
                            <div className="location-temperature-right">
                                <BiDroplet />
                                <p>Humidity: {data.current.humidity}%</p>
                            </div>
                            <div className="location-temperature-right">
                                <CiTempHigh />
                                <p>Real felt: {data.current.feelslike_c}°C</p>
                            </div>
                            <div className="location-temperature-right">
                                <FaWind />
                                <p>Wind: {data.current.wind_kph}km/h</p>
                            </div>
                        </div>
                    </div>
                )}         
                <div>
                    {data.forecast &&  data.forecast.forecastday.map((day) => (
                        <div className="all-day-header" key={day.date}>
                        <h3 className="all-day-header-head">{format(new Date(day.date), "dd. MMMM yyyy")}</h3>
                            {day.hour.map((hour) => (
                                <div className="all-day" key={hour.time_epoch}>
                                
                                    <p>{format(new Date(hour.time), "HH:mm")}</p>
                                    <p>{hour.temp_c}°C</p>
                                    <img src={hour.condition.icon} alt="weather-icon" />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    )
}

export default TodayWeather


