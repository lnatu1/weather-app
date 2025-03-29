import { create } from "zustand";

interface WeatherStore {
  country: string;
  history: string[];
  recentHistory: () => string[];
  setCountry: (country: string) => void;
  removeHistoryItem: (country: string) => void;
  clearHistory: () => void;
}

export const useWeatherStore = create<WeatherStore>((set, get) => {
  const savedHistory = JSON.parse(
    localStorage.getItem("weatherHistory") || "[]"
  );

  return {
    country: "Singapore, SG",
    history: savedHistory,
    recentHistory: () => get().history.slice(0, 5),
    setCountry: (country) => {
      set((state) => {
        const newHistory = [
          country,
          ...state.history.filter((c) => c !== country),
        ];
        localStorage.setItem("weatherHistory", JSON.stringify(newHistory));
        return {
          country,
          history: newHistory,
        };
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
