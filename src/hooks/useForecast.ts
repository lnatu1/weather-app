import { useQuery } from "@tanstack/react-query";
import { get5DayForecast } from "../api/weather";
import { useWeatherStore } from "../store/useWeatherStore";

export default function useForecast() {
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

  return {
    isLoading,
    forecast,
    error,
  };
}
