import { useEffect, useState, type ChangeEvent } from "react";
import CountryCard from "./CountryCard";
import "./Countries.scss";
import { VscError } from "react-icons/vsc";
import { Input, Select } from "antd";

interface Country {
  name: { common: string };
  flags: { png: string; svg: string };
  population: number;
  capital?: string[];
}

type SortField = "name" | "population";
type SortOrder = "asc" | "desc";

export default function Countries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filtered, setFiltered] = useState<Country[]>([]);
  const [search, setSearch] = useState<string>("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string>("");

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,population,capital"
        );
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data: Country[] = await res.json();
        if (!Array.isArray(data)) {
          throw new Error("Unexpected data format");
        }
        setCountries(data);
        setFiltered(sortCountries(data, sortField, sortOrder));
      } catch (err) {
        console.error("Fetch error:", err);
        setFetchError(
          "Sorry, we couldn’t load the countries. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // 🔍 Filter and sort dynamically
  useEffect(() => {
    const query = search.toLowerCase();
    const results = countries.filter((c) =>
      c.name.common.toLowerCase().includes(query)
    );
    setFiltered(sortCountries(results, sortField, sortOrder));
  }, [search, sortField, sortOrder, countries]);

  // 🔽 Sort helper
  const sortCountries = (
    list: Country[],
    field: SortField,
    order: SortOrder
  ) => {
    return [...list].sort((a, b) => {
      if (field === "name") {
        const compare = a.name.common.localeCompare(b.name.common);
        return order === "asc" ? compare : -compare;
      } else {
        const compare = a.population - b.population;
        return order === "asc" ? compare : -compare;
      }
    });
  };

  // 🔧 Handlers
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleSortFieldChange = (value: SortField) => setSortField(value);

  const handleSortOrderChange = (value: SortOrder) => setSortOrder(value);

  return (
    <div className="countries-container">
      <div className="countries-header">
        <h2 className="title">Countries ({filtered.length})</h2>

        {/* Controls */}
        <div className="controls">
          <Input
            type="text"
            style={{ height: 40 }}
            placeholder="Search countries..."
            value={search}
            onChange={handleSearch}
          />

          <div className="select-container">
            <Select
              defaultValue="name"
              style={{ width: 160, height: 40, textAlign: "left" }}
              onChange={handleSortFieldChange}
              options={[
                { value: "name", label: "Sort by Name" },
                { value: "population", label: "Sort by Population" },
              ]}
            />
          </div>

          <div className="select-container">
            <Select
              defaultValue="asc"
              style={{ width: 120, height: 40, textAlign: "left" }}
              onChange={handleSortOrderChange}
              options={[
                { value: "asc", label: "Ascending" },
                { value: "desc", label: "Descending" },
              ]}
            />
          </div>
        </div>
      </div>

      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
          <h2>Loading countries...</h2>
        </div>
      )}

      {fetchError && (
        <div className="spinner-container">
          <h2 className="error-message">
            <VscError className="error-icon" />
            {fetchError}
          </h2>
        </div>
      )}

      {/* Cards Grid */}
      {!loading && !fetchError && (
        <div className="countries-grid">
          {filtered.map((country) => (
            <CountryCard
              key={country.name.common}
              name={country.name.common}
              flag={country.flags.png}
              capital={country.capital?.[0]}
              population={country.population}
            />
          ))}
        </div>
      )}
    </div>
  );
}
