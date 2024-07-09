// C:\Users\kanka\OneDrive\Desktop\Smart-frontend-internship\weather-dashboard\src\App.js



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Search from './components/Search';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import TemperatureChart from './components/TemperatureChart';

const App = () => {
  const [user, setUser] = useState(null);
  const [city, setCity] = useState('Delhi');
  const [forecastData, setForecastData] = useState([]);

  const updateCity = (newCity) => {
    setCity(newCity);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=49cc8c821cd2aff9af04c9f98c36eb74`
        );
        const data = response.data.list.map(item => ({
          date: new Date(item.dt * 1000).toLocaleDateString(),
          temperature: item.main.temp,
        }));
        setForecastData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [city]);

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Container>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route
            path="/"
            element={
              <>
                <div className="forecast-container">
                  <div className="container">
                    <div className="current-info">
                      <div className="place-container">
                        <input
                          type="text"
                          id="cityInput"
                          placeholder="Enter City Name"
                          onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                              updateCity(event.target.value);
                            }
                          }}
                        />
                        <button onClick={() => updateCity(document.getElementById('cityInput').value)}>Search</button>
                      </div>
                      <div className="date-container">
                        <div className="time" id="time">
                          <span id="am-pm"></span>
                        </div>
                        <div className="date" id="date"></div>
                      </div>
                    </div>
                  </div>
                  <Forecast city={city} />
                  <h5>7-Days Temperature Forecast</h5>
                
                </div>
              </>
            }
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;



