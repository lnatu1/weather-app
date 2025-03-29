import { useWeatherStore } from "../store/useWeatherStore";

const SearchHistory = () => {
  const { setCountry, history, removeHistoryItem } = useWeatherStore();

  if (history.length === 0) return null;

  return (
    <>
      <div className="mt-4 p-2 text-xl font-medium">Search History</div>
      <div className="rounded-lg shadow">
        <ul>
          {history.map((h) => (
            <li key={h} className="flex items-center justify-between p-2">
              <div>{h}</div>
              <div>
                <button
                  className="cursor-pointer text-2xl mr-4"
                  onClick={() => setCountry(h)}
                >
                  🔍
                </button>
                <button
                  className="cursor-pointer text-2xl"
                  onClick={() => removeHistoryItem(h)}
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SearchHistory;
