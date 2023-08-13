import { useState } from "react";
import HistoryWeather from "./components/History/HistoryWeather"
import TodayWeather from "./components/Today/TodayWeather"


const App = () => {

  const [locationForHistory, setLocationForHistory] = useState('');

  return (
    <div>
      <TodayWeather sendLocation={setLocationForHistory} />
      <HistoryWeather location={locationForHistory} />
    </div>
  )
}

export default App

