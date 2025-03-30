import { useCallback, useEffect, useState } from "react";
import { getCountries } from "../api/countries";
import { CountryData } from "../interfaces/country";
import { useWeatherStore } from "../store/useWeatherStore";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import Button from "./Button";
import SearchHistory from "./SearchHistory";

const Location = () => {
  const { country, setCountry } = useWeatherStore();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  const [stopSearch, setStopSearch] = useState(false);
  const [countries, setCountries] = useState<CountryData>({
    data: [],
    error: "",
  });

  const searchCountries = useCallback(async () => {
    const data = await getCountries(query);
    setCountries({
      data: data.data,
      error: data.error,
    });
  }, [query]);

  const triggerWeatherSearchByLocation = () => {
    if (query.trim().length === 0 || countries.error !== "") return;
    setCountry(query);
    setQuery("");
  };

  useEffect(() => {
    if (query.trim() === "" || !stopSearch) {
      setCountries({
        data: [],
        error: "",
      });
      return;
    }
    const debounceTimeout = setTimeout(() => {
      searchCountries();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [query, stopSearch, searchCountries]);

  return (
    <div className="mb-4">
      <Card>
        <div className="flex items-center">
          <div className="text-lg font-medium">
            <span className="text-2xl">📍</span> {country}
          </div>
          <div className="ml-auto">
            <button
              className="cursor-pointer text-2xl"
              onClick={() => setToggleSearch(!toggleSearch)}
            >
              🔍
            </button>
          </div>
        </div>

        {toggleSearch && (
          <>
            <div className="flex gap-4 mt-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search country or city name here..."
                  className="outline-blue-300 shadow rounded-lg py-2 px-4 w-full"
                  value={query}
                  onChange={(e) => {
                    setStopSearch(true);
                    setQuery(e.target.value);
                  }}
                />
                {countries.error && (
                  <p className="text-red-500 font-medium mt-1">
                    {countries.error}
                  </p>
                )}
                {countries.data?.length > 0 && (
                  <div className="shadow rounded-lg overflow-hidden  absolute top-full w-full max-h-[400px] overflow-y-auto left-0 bg-white">
                    <ul>
                      {countries.data?.map((c) => (
                        <li
                          key={c.code}
                          onClick={() => {
                            setQuery(`${c.name}, ${c.code}`);
                            setStopSearch(true);
                            setCountries({ data: [], error: "" });
                            setStopSearch(false);
                          }}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-300"
                        >
                          {c.name}, {c.code}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <Button onClick={triggerWeatherSearchByLocation}>Search</Button>
              </div>
            </div>

            <div className="flex justify-between items-center my-4 p-2">
              <span className="sm:text-xl font-medium">Search History</span>
              <Button onClick={() => navigate("/history")}>
                View full history
              </Button>
            </div>
            <SearchHistory />
          </>
        )}
      </Card>
    </div>
  );
};

export default Location;
