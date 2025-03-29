import { useWeatherStore } from "../store/useWeatherStore";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "./Card";
import Button from "./Button";

const Back = () => {
  const navigate = useNavigate();
  return <Button onClick={() => navigate("/")}>Back</Button>;
};

const SearchHistory = () => {
  const navigate = useNavigate();
  const { setCountry, history, recentHistory, removeHistoryItem } =
    useWeatherStore();
  const location = useLocation();

  if (history.length === 0 && location.pathname === "/history")
    return (
      <Card>
        <div className="flex items-center justify-between">
          <span> No history found </span>
          <Back />
        </div>
      </Card>
    );

  const displayedHistory =
    location.pathname === "/" ? recentHistory() : history;

  return (
    <>
      <div className="rounded-lg bg-white shadow">
        {location.pathname === "/history" && (
          <div className="flex items-center justify-between p-4">
            <span className="text-xl font-medium">Search hitory</span>
            <Back />
          </div>
        )}
        <ul>
          {displayedHistory.map((h) => (
            <li key={h} className="flex items-center justify-between py-2 px-4">
              <div>{h}</div>
              <div>
                <button
                  className="cursor-pointer text-2xl mr-4"
                  onClick={() => {
                    navigate("/");
                    setCountry(h);
                  }}
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
