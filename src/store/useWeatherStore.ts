import { create } from "zustand";

interface WeatherStore {
  country: string;
  history: string[];
  setCountry: (country: string) => void;
  removeHistoryItem: (country: string) => void;
  clearHistory: () => void;
}

export const useWeatherStore = create<WeatherStore>((set) => {
  const savedHistory = JSON.parse(
    localStorage.getItem("weatherHistory") || "[]"
  );

  return {
    country: "Singapore, SG",
    history: savedHistory, // Load history from localStorage
    setCountry: (country) => {
      set((state) => {
        const newHistory = [
          country,
          ...state.history.filter((c) => c !== country),
        ].slice(0, 7); // Keep last 7 searches
        localStorage.setItem("weatherHistory", JSON.stringify(newHistory));
        return { country, history: newHistory };
      });
    },
    removeHistoryItem: (country) => {
      set((state) => {
        const newHistory = state.history.filter((c) => c !== country);
        localStorage.setItem("weatherHistory", JSON.stringify(newHistory));
        return { history: newHistory };
      });
    },
    clearHistory: () => {
      localStorage.removeItem("weatherHistory");
      set({ history: [] });
    },
  };
});
