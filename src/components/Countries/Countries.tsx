import { useEffect, useState, type ChangeEvent } from "react";
import CountryCard from "../CountryCard/CountryCard";
import "./Countries.scss";
import { VscError } from "react-icons/vsc";
import { Input, Select, Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import type { Country, SortField, SortOrder } from "@/types/country";
import sortCountries from "../../utils/countries";
import { useFetchCountries } from "../../hooks/api/useFetchCountries";

export default function Countries() {
  const [filtered, setFiltered] = useState<Country[]>([]);
  const [search, setSearch] = useState<string>("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const errorMessage =
    "Sorry, we couldn’t load the countries. Please try again later.";

  // Fetch countries
  const {
    data: countries,
    isLoading,
    error,
  } = useFetchCountries({
    fields: "name,flags,population,capital", // send fields directly in URL
  });

  // Filter and sort
  useEffect(() => {
    if (!countries) return;
    const query = search.toLowerCase();
    const results = countries.filter((c) =>
      c.name.common.toLowerCase().includes(query)
    );
    setFiltered(sortCountries(results, sortField, sortOrder));
  }, [search, sortField, sortOrder, countries]);

  // Handlers
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

          <Select
            defaultValue="name"
            className="field select"
            onChange={handleSortFieldChange}
            options={[
              { value: "name", label: "Sort by Name" },
              { value: "population", label: "Sort by Population" },
            ]}
          />

          <Select
            defaultValue="asc"
            className="order select"
            onChange={handleSortOrderChange}
            options={[
              { value: "asc", label: "Ascending" },
              { value: "desc", label: "Descending" },
            ]}
          />
        </div>
      </div>

      {isLoading && (
        <div className="message-container">
          <Flex align="center" gap="middle">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          </Flex>
          <h2 className="loading-message">Loading...</h2>
        </div>
      )}

      {error && (
        <div className="message-container">
          <h2 className="error-message">
            <VscError className="error-icon" />
            {errorMessage}
          </h2>
        </div>
      )}

      {/* Cards Grid */}
      {!isLoading && !error && (
        <div className="countries-grid">
          {filtered.map((country, index) => (
            <CountryCard
              key={index}
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
