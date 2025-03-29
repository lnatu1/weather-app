import axios from "axios";
import moment from "moment";
import { Forecasts, ForcastItem, WeatherData } from "../interfaces/weather";

const weatherUrl = import.meta.env.VITE_OPEN_WEATHER_API_URL;
const forecastUrl = import.meta.env.VITE_OPEN_WEATHER_FORECAST_URL;
const weatherAssetsUrl = import.meta.env.VITE_OPEN_WEATHER_ASSETS_URL;
const weatherKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const classifyWindSpeed = (speed: number): string => {
  if (speed <= 5.4) return "⬇️"; // light wind
  if (speed <= 10.7) return "↔️"; // morderate wind
  if (speed <= 17.1) return "⬆️"; // strong wind
  return "⬆️⬆️"; // very strong wind
};

const kelvinToCelsius = (kelvin: number): string => {
  return `${(kelvin - 273.15).toFixed(1)}°C`;
};

/**
 * Fetches weather data for a given location.
 *
 * @param {string} location - The city or country name to fetch weather data for.
 * @returns {Promise<WeatherData>} A promise resolving to weather details.
 * @throws {Error} Throws an error if fetching fails.
 */
const getWeather = async (location: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `${weatherUrl}?q=${location}&appid=${weatherKey}`
    );
    const data = response.data;
    const windSpeed = data.wind.speed;

    return {
      date: moment.unix(data.dt).format("MMMM DD, YYYY"),
      icon: weatherAssetsUrl.replace("%ICON_NAME%", data.weather[0].icon),
      temp: `${kelvinToCelsius(data.main.temp)}`,
      description: data.weather[0].description,
      humidity: `${data.main.humidity}%`,
      winds: `${classifyWindSpeed(windSpeed)} ${windSpeed} m/s`,
      visibility: `${data.visibility / 1000} km`,
    };
  } catch {
    throw new Error("Failed to fetch weather data");
  }
};

/**
 * Fetches a 5-day weather forecast for a given location.
 *
 * @param {string} location - The city or country name to fetch forecast data.
 * @returns {Promise<Forecasts[]>} A promise resolving to an array of forecast data.
 * @throws {Error} Throws an error if fetching fails.
 */
const get5DayForecast = async (location: string): Promise<Forecasts[]> => {
  try {
    const response = await axios.get(
      `${forecastUrl}?q=${location}&appid=${weatherKey}&units=metric`
    );
    const data = response.data;

    // Object to group forecasts by date
    const groupedForecast: Record<string, ForcastItem[]> = {};

    for (const item of data.list) {
      const [date, time] = item.dt_txt.split(" ");
      const formattedDate = moment(date).format("DD MMMM");
      const hour = moment(time, "HH:mm:ss").hour();

      // Only keep forecasts up to 23:00
      if (hour <= 23) {
        if (!groupedForecast[formattedDate]) {
          groupedForecast[formattedDate] = [];
        }

        // Prepare weather data
        const icon = weatherAssetsUrl.replace(
          "%ICON_NAME%",
          item.weather[0].icon
        );
        groupedForecast[formattedDate].push({
          time: moment(time, "HH:mm:ss").format("HH:mm"),
          temp_min: item.main.temp_min.toFixed(2),
          temp_max: item.main.temp_max.toFixed(2),
          description: item.weather[0].description,
          icon,
        });
      }
    }

    // Convert object to an array and return only 5 days
    const dailyForecast: Forecasts[] = Object.entries(groupedForecast)
      .slice(0, 5)
      .map(([date, forecasts]) => ({ date, forecasts }));

    return dailyForecast;
  } catch {
    throw new Error("Failed to fetch weather data");
  }
};

export { getWeather, get5DayForecast };
