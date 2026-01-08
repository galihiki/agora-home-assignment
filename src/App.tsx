import Countries from "./components/Countries/Countries";
import SideBar from "./components/SideBar/SideBar";
import type { SideBarItem } from "./types/sideBar";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { useFetchCountries } from "./hooks/api/useFetchCountries";
import { CountriesContext } from "./context/CountriesContext";
import Dashboard from "./components/Dashboard/Dashboard";
import CapitalGame from "./components/CapitalGame/CapitalGame";
import TodoList from "./components/TodoList/TodoList";

function App() {
  const items: SideBarItem[] = [
    {
      title: "Countries List",
      iconName: "CiBoxList",
      iconType: "CI",
      path: "/",
    },
    {
      title: "Dashboard",
      iconName: "MdOutlineDashboard",
      iconType: "MD",
      path: "/dashboard",
    },
    {
      title: "Capital Game",
      iconName: "MdGamepad",
      iconType: "MD",
      path: "/capital-game",
    },
    {
      title: "Todo List",
      iconName: "MdListAlt",
      iconType: "MD",
      path: "/todo",
    },
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/capital-game" element={<CapitalGame />} />
          <Route path="/todo" element={<TodoList />} />
        </Routes>
      </CountriesContext.Provider>
    </div>
  );
}

export default App;
