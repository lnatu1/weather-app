import Forecast from "../components/Forecast";
import TodayForecast from "../components/TodayForecast";
import Location from "../components/Location";

const Home = () => {
  return (
    <>
      <Location />
      <TodayForecast />
      <Forecast />
    </>
  );
};

export default Home;
