import { useEffect, useState, type ChangeEvent } from "react";
import CountryCard from "./CountryCard";
import "./Countries.scss";
import { VscError } from "react-icons/vsc";

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

  // 🧩 Fetch countries
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

  const handleSortFieldChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setSortField(e.target.value as SortField);

  const handleSortOrderChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setSortOrder(e.target.value as SortOrder);

  return (
    <div className="countries-container">
      <div className="countries-header">
        <h2>🌍 Countries ({filtered.length})</h2>

        {/* Controls */}
        <div className="controls">
          <input
            type="text"
            placeholder="Search countries..."
            value={search}
            onChange={handleSearch}
          />

          <select value={sortField} onChange={handleSortFieldChange}>
            <option value="name">Sort by Name</option>
            <option value="population">Sort by Population</option>
          </select>

          <select value={sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
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
