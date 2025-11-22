import Countries from "./components/Countries/Countries";
import SideBar from "./components/SideBar/SideBar";
import type { SideBarItem } from "./types/sideBar";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { useFetchCountries } from "./hooks/api/useFetchCountries";
import { CountriesContext } from "./context/CountriesContext";

function App() {
  const items: SideBarItem[] = [
    { title: "Countries List", iconName: "", path: "/" },
    { title: "Dashboard", iconName: "", path: "/dashboard" },
  ];

  // Fetch countries
  const {
    data: countries,
    isLoading,
    error,
  } = useFetchCountries({
    fields: "name,flags,population,capital,languages",
  });

  return (
    <div className="app-container">
      <SideBar items={items} />
      <CountriesContext.Provider value={{ countries, isLoading, error }}>
        <Routes>
          <Route path="/" element={<Countries />} />
          <Route path="/about" element={<Countries />} />
        </Routes>
      </CountriesContext.Provider>
    </div>
  );
}

export default App;
