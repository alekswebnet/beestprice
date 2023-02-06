export interface IWeather {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number
    time: string;
  }
}

export const getCurrentWeaher = async (): Promise<IWeather> => {
  return fetch('https://api.open-meteo.com/v1/forecast?latitude=47.91&longitude=33.39&current_weather=true&timezone=Africa%2FCairo')
    .then((res) => res.json())
}