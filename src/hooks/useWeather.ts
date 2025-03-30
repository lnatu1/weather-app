import { useQuery } from "@tanstack/react-query";
import { getWeather } from "../api/weather";
import { useWeatherStore } from "../store/useWeatherStore";

export default function useWeather() {
  const { country } = useWeatherStore();
  const {
    isLoading,
    error,
    data: weather,
  } = useQuery({
    queryKey: ["todayweather", country],
    queryFn: () => getWeather(country),
    enabled: !!country,
    retry: 1,
  });

  return {
    isLoading,
    weather,
    error,
  };
}
