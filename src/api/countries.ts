import axios from "axios";
import { CountryData } from "../interfaces/country";

const countriesUrl = import.meta.env.VITE_COUNTRIES_URL;

/**
 * Fetches country data based on the provided name.
 *
 * @param {string} name - The country or city name to search for.
 * @returns {Promise<CountryData>} A promise resolving to the country data or an error message.
 */
const getCountries = (() => {
  let controller: AbortController | null = null;

  return async (name: string): Promise<CountryData> => {
    try {
      // Abort the previous request if it exists
      if (controller) {
        controller.abort();
      }

      // Create a new AbortController for the current request
      controller = new AbortController();

      const response = await axios.get(`${countriesUrl}/${name}`, {
        signal: controller.signal, // Attach signal for aborting
      });

      const data = response.data;

      // @ts-expect-error: API response type is unknown, need to refine later
      const formattedData = data.map((d) => ({
        name: d.name.common,
        code: d.cca2,
      }));

      return {
        data: formattedData,
        error: "",
      };
    } catch (err) {
      // Handle request cancellation separately
      if (axios.isCancel(err)) {
        console.log("Request canceled:", err.message);
        return { data: [], error: "Request canceled" };
      }

      return {
        data: [],
        error: "Invalid country or city",
      };
    }
  };
})();

export { getCountries };
