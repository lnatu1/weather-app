import { useQuery } from "@tanstack/react-query";
import { get5DayForecast } from "../api/weather";
import { useWeatherStore } from "../store/useWeatherStore";
import { Forecasts, ForcastItem } from "../interfaces/weather";
import Card from "./Card";
import ForecastSkeleton from "./ForecastSkeleton";

const ForecastTime = ({ item }: { item: ForcastItem }) => {
  return (
    <div className="min-[400px]:flex items-center gap-4 mt-3 font-medium">
      <div>{item.time}</div>
      <div className="flex justify-between items-center flex-1 max-[400px]:text-sm">
        <div className="flex items-center text-gray-400">
          <div>
            <img className="w-[40px]" src={item.icon} />
          </div>
          <div>
            {item.temp_min} / {item.temp_max}°C
          </div>
        </div>
        <div className="ml-auto">{item.description}</div>
      </div>
    </div>
  );
};

const ForecastCard = ({ forecast }: { forecast: Forecasts }) => {
  return (
    <div className="mb-8">
      <div className="text-gray-400 font-medium">{forecast.date}</div>
      {forecast.forecasts.map((item) => (
        <ForecastTime key={item.time} item={item} />
      ))}
    </div>
  );
};

const TodayForecast = () => {
  const { country } = useWeatherStore();
  const {
    isLoading,
    error,
    data: forecast,
  } = useQuery({
    queryKey: ["5dayforecast", country],
    queryFn: () => get5DayForecast(country),
    enabled: !!country,
    retry: 1,
  });

  if (error)
    return (
      <div className="mt-4">
        <Card>
          <p className="text-red-500 font-medium">
            Failed to get weather forecast. Please try again
          </p>
        </Card>
      </div>
    );

  if (isLoading) return <ForecastSkeleton />;

  return (
    <>
      <div className="mt-6 mb-2 text-xl font-medium">
        5-day Forecast (3 Hours)
      </div>

      <Card>
        {forecast?.map((f) => (
          <ForecastCard forecast={f} key={f.date} />
        ))}
      </Card>
    </>
  );
};

export default TodayForecast;
