import sunnyBg from "./assets/sunny.jpg";
import rainyBg from "./assets/rainy.jpg";
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getApiData } from "./weather";
import './App.css'
function App() {

  const [city, setCity] = useState("Kotdwara");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(sunnyBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getApiData(city, units);
      setWeather(data);

      // dynamic background
      const threshold = units === 'metric' ? 20 : 60;
      if (data.temp <= threshold) setBg(rainyBg);
      else setBg(sunnyBg);
    };
    fetchWeatherData();
  }, [units, city]);

  const handleUniteClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };
 
 if(weather===null)
{ return <div  style={{alignItems:'center' , textAlign:'center' ,display:'flex' , justifyContent:'center'}}
 >
  <h1>Loading...</h1>

 </div>
   }   return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {
          weather.length===0  ?<h1 className="head">City Not Found</h1> : (
            < div className="container">

              <div className="section section_inputs">
                <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter City name" />
                <button onClick={(e) => handleUniteClick(e)}> °C </button>
              </div>
              <div className=" section section_temprature">
                <div className="icon">
                  <h3>{weather.name},{weather.country}</h3>
                  <img src={weather.iconURL} alr="sunny" />
                  <h3>{weather.description}</h3>
                </div>
                <div className="temprature">
                  <h2>{`${weather.temp.toFixed()} °${units === "metric" ? "C" : "F"}`}</h2>
                </div>
              </div>

              {/* bottom description */}
              <Descriptions weather={weather} units={units} />
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
