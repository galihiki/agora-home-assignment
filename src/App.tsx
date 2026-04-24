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
import MessageBoard from "./components/messageBoard/MessageBoard";
import Table from "./components/table/table/Table";
import TreeMenuNew from "./components/treeMenu/treeMenuNew/TreeMenuNew";

function App() {
  const items: SideBarItem[] = [
    {
      title: "Countries List",
      iconName: "CiBoxList",
      iconType: "CI",
      path: "/",
    },
    {
      title: "Countries Window",
      iconName: "CiBoxList",
      iconType: "CI",
      path: "/countriesWindow",
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
    {
      title: "Message Board",
      iconName: "MdListAlt",
      iconType: "MD",
      path: "/messageBoard",
    },
    {
      title: "Table",
      iconName: "MdListAlt",
      iconType: "MD",
      path: "/table",
    },
    {
      title: "TreeMenu",
      iconName: "MdListAlt",
      iconType: "MD",
      path: "/treeMenu",
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
          <Route path="/messageBoard" element={<MessageBoard />} />
          <Route path="/table" element={<Table />} />
          <Route path="/treeMenu" element={<TreeMenuNew />} />
        </Routes>
      </CountriesContext.Provider>
    </div>
  );
}

export default App;
