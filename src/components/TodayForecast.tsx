import useWeather from "../hooks/useWeather";
import Card from "./Card";
import WeatherSkeleton from "./WeatherSkeleton";
import ErrorCard from "./ErrorCard";

const WeatherConditionCard = ({
  name,
  value,
}: {
  name: string;
  value: string;
}) => {
  return (
    <div>
      <div className="text-slate-400 font-medium">{name}</div>
      <div className="font-bold">{value}</div>
    </div>
  );
};

const TodayForecast = () => {
  const { weather, isLoading, error } = useWeather();

  if (error)
    return <ErrorCard message="Failed to get weather data. Please try again" />;

  if (isLoading) return <WeatherSkeleton />;

  return (
    <Card>
      <div className="font-medium text-xl">{weather?.date}</div>
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="w-[100px]">
          <img className="w-full" src={weather?.icon} />
        </div>
        <div className="text-center">
          <div className="text-[2rem] font-bold">{weather?.temp}</div>
          <div>{weather?.description}</div>
        </div>
      </div>
      <div className="flex justify-between text-center mt-8">
        <WeatherConditionCard name="Humidity" value={weather?.humidity || ""} />
        <WeatherConditionCard name="Winds" value={weather?.winds || ""} />
        <WeatherConditionCard
          name="Visibility"
          value={weather?.visibility || ""}
        />
      </div>
    </Card>
  );
};

export default TodayForecast;
