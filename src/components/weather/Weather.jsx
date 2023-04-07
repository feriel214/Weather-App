import { CircularProgress, Slide, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "./weather.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Weather(props) {
  const location = useLocation();
  const userCountry = localStorage.getItem("country") ;
  const [inputText, setInputText] = useState(userCountry);
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cityName, setCityName] = useState("");
 
  console.log("c fel wether ",  userCountry && userCountry)
  const kelvinToCelsiu = (kelvin) => {
    const celsius = kelvin - 273.15;
    return celsius.toFixed(2);
  };
  
  useEffect(() => {
    if(cityName.length === 0) {
      axios
      .get(`http://localhost:5001/weather/${userCountry}`)
      .then((res) => {
        error && setError(false);
        console.log("res: ", res);
        console.log("res.data : ", res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
    }
    else{
      axios
      .get(`http://localhost:5001/weather/${cityName}`)
      .then((res) => {
        error && setError(false);
        console.log("res: ", res);
        console.log("res.data : ", res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
    }
    
  }, [cityName, error]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setCityName(e.target.value);
      setInputText("");
    }
  };

  return (
    <div className="bg_img">
      <>
        <TextField
          variant="filled"
          label="Search location"
          className="input"
          error={error}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleSearch}
        />
        <h1 className="city"></h1>
        <div className="group">
          {/*<img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />*/}
          <h1>{cityName || data.Country}</h1>
        </div>
        {/** Temperature **/}

        <h1 className="temp">{kelvinToCelsiu(data.temperature)} °C</h1>
        <Slide direction="right" timeout={800} in={!loading}>
          <div className="box_container">
            {/** Humidity **/}
            <div className="box">
              <p>Humidity</p>
              <h1>{data.humidity} %</h1>
            </div>
            {/** Wind **/}
            <div className="box">
              <p>Wind</p>
              <h1>{data.wind} km/h</h1>
            </div>
            {/** Feels Like **/}
            <div className="box">
              <p>Description</p>
              <h1>{data.description}</h1>
            </div>

            <div className="box">
              <p>Pressure</p>
              <h1>{data.pressure} Pa</h1>
            </div>
          </div>
        </Slide>
      </>
    </div>
  );
}
