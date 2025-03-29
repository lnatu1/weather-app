export interface ForcastItem {
  description: string;
  icon: string;
  temp_max: string;
  temp_min: string;
  time: string;
}

export interface Forecasts {
  date: string;
  forecasts: ForcastItem[];
}

export interface WeatherData {
  date: string;
  icon: string;
  temp: string;
  description: string;
  humidity: string;
  winds: string;
  visibility: string;
}
