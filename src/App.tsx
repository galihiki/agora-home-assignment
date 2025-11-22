import Countries from "./components/Countries/Countries";
import SideBar from "./components/SideBar/SideBar";
import type { SideBarItem } from "../../types/sideBar";
import "./App.scss";
import { Route, Routes } from "react-router-dom";

function App() {
  const items: SideBarItem[] = [
    { title: "Countries List", iconName: "", path: "/" },
    { title: "Dashboard", iconName: "", path: "/dashboard" },
  ];

  return (
    <div className="app-container">
      <SideBar items={items} />
      <Routes>
        <Route path="/" element={<Countries />} />
        <Route path="/about" element={<Countries />} />
      </Routes>
    </div>
  );
}

export default App;
