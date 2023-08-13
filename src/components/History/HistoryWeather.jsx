import { useEffect, useState } from 'react'
import axios from "axios"
import PropTypes from 'prop-types';
import { format, addDays, subDays } from "date-fns"

import "./HistoryWeather.css"


const HistoryWeather = ({ location }) => {

  HistoryWeather.propTypes = {
    location: PropTypes.string.isRequired,
    dateM: PropTypes.string.isRequired
  };
  
  
  const [data, setData] = useState({})
  const [originalDate, setOriginalDate] = useState(subDays(new Date(), 1))
  const [dayOffset, setDayOffset] = useState(0);

  const currentDate = addDays(originalDate, dayOffset);

  const url = `http://api.weatherapi.com/v1/history.json?key=1c7609957a4c441d9e980524230508&q=${location}&dt=${format(
    currentDate,
    'yyyy-MM-dd'
  )}`;

  const searchLocation = () => {  
    axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
    })
}

const handleDateMinus = () => {
  setDayOffset(prevOffset => prevOffset - 1);
};

const handleDatePlus = () => {
  if (dayOffset < 0) {
    setDayOffset(prevOffset => prevOffset + 1);
  }
};


useEffect(() => {
  searchLocation() 
}, [currentDate])



  return (
    <div className="history-weather-body">
        <div>
        {data.forecast && data.forecast.forecastday && (
          <div className="history-weather-body-title">
            <h2 >Historic weather</h2>
          </div>
        )}
          {data.forecast && data.forecast.forecastday && (
            <div className="all-day-header">
              
              <div className="all-day-header-head">
                <h3>{format(new Date(data.forecast.forecastday[0].date), 'dd. MMMM yyyy')}</h3>
                <button className="all-day-header-head-button" onClick={handleDateMinus}>-</button>
                <button className="all-day-header-head-button" onClick={handleDatePlus}>+</button>
              </div>
                {data.forecast.forecastday[0].hour.map((hourData) => (
                  <div key={hourData.time_epoch} className="all-day">
                    <p>{format(new Date(hourData.time), 'HH:mm')}</p>
                    <p>{hourData.temp_c}°C</p>
                    <img src={`http:${hourData.condition.icon}`} alt="Weather Icon" /> 
                  </div>
                ))}
            </div>
          )}
        </div>
        {data.forecast && data.forecast.forecastday && (
        <div className="footer">
          <p>© Anakin Skywalker Copyrights are reserved and exercised by the operator of the portal.</p>
        </div>
        )}
    </div>
  )
}

export default HistoryWeather