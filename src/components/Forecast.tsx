import { Forecasts, ForcastItem } from "../interfaces/weather";
import useForecast from "../hooks/useForecast";
import ForecastSkeleton from "./ForecastSkeleton";
import Card from "./Card";
import ErrorCard from "./ErrorCard";

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
  const { forecast, error, isLoading } = useForecast();

  if (error)
    return (
      <div className="mt-4">
        <ErrorCard message="Failed to get weather forecast. Please try again" />
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
