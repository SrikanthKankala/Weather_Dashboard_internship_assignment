



// // //C:\Users\kanka\OneDrive\Desktop\Smart-frontend-internship\weather-dashboard\src\components\Forecast.js






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Paper
} from '@mui/material';
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiHot,
  WiThermometer,
  WiSnowflakeCold,
  WiDayCloudy,
  WiNightClear
} from 'react-icons/wi';
import TemperatureChart from './TemperatureChart'; // Import TemperatureChart

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const Forecast = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [cityName, setCityName] = useState(city);

  const API_KEY = "49cc8c821cd2aff9af04c9f98c36eb74";
  const geocodingUrl = "https://api.openweathermap.org/geo/1.0/direct";
  const oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall";

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const geoResponse = await axios.get(`${geocodingUrl}?q=${city}&limit=1&appid=${API_KEY}`);
        const { lat, lon } = geoResponse.data[0];
        setCityName(geoResponse.data[0].name);

        const response = await axios.get(`${oneCallUrl}?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${API_KEY}&units=metric`);
        setForecast(response.data.daily);
        setCurrentWeather(response.data.current);

        // Prepare data for TemperatureChart
        const chartData = response.data.daily.map(day => ({
          date: new Date(day.dt * 1000),
          temperature: day.temp.day
        })).map(day => ({
          label: `${days[day.date.getDay()]} ${day.date.getDate()} ${months[day.date.getMonth()]}`,
          temperature: day.temperature
        }));
        setChartData(chartData);

      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (city) {
      fetchForecast();
    }
  }, [city, API_KEY]);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date();
      const month = time.getMonth();
      const date = time.getDate();
      const day = time.getDay();
      const hour = time.getHours();
      const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
      const minutes = time.getMinutes();
      const ampm = hour >= 12 ? 'PM' : 'AM';

      document.getElementById('time').innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + `<span id="am-pm">${ampm}</span>`;
      document.getElementById('date').innerHTML = days[day] + ' ' + date + ' ' + months[month];
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (description, temperature) => {
    if (description.includes('clear')) {
      return <WiDaySunny />;
    } else if (description.includes('clouds')) {
      return <WiCloud />;
    } else if (description.includes('rain')) {
      return <WiRain />;
    } else if (description.includes('snow')) {
      return <WiSnow />;
    } else if (description.includes('thunderstorm')) {
      return <WiThunderstorm />;
    } else if (description.includes('fog') || description.includes('mist')) {
      return <WiFog />;
    } else {
      if (temperature > 30) {
        return <WiHot />;
      } else if (temperature > 20) {
        return <WiThermometer />;
      } else if (temperature > 10) {
        return <WiDaySunny />;
      } else if (temperature > 0) {
        return <WiSnowflakeCold />;
      } else {
        return <WiSnow />;
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        {currentWeather && (
          <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
            <Typography variant="h4">{cityName}</Typography> {/* Display the city name */}
            <Typography variant="h4">{days[new Date(currentWeather.dt * 1000).getDay()]}</Typography>
            <Typography variant="h5">{currentWeather.temp}°C</Typography>
            <Typography variant="h6">{currentWeather.weather[0].description}</Typography>
            <Box sx={{ fontSize: 60 }}>
              {getWeatherIcon(currentWeather.weather[0].description, currentWeather.temp)}
            </Box>
          </Box>
        )}
      </Paper>
      <Grid container spacing={2}>
        {forecast.slice(1, 7).map((day, index) => {
          const date = new Date(day.dt * 1000);
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{days[date.getDay()]}</Typography>
                  <Typography variant="h6">{day.temp.day}°C</Typography>
                  <Typography variant="body1">{day.weather[0].description}</Typography>
                  <Box sx={{ fontSize: 50 }}>
                    {getWeatherIcon(day.weather[0].description, day.temp.day)}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <TemperatureChart forecastData={chartData} /> {/* Render TemperatureChart */}
    </Box>
  );
};

export default Forecast;

