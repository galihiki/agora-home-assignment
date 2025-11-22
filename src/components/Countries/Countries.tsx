import { useEffect, useState } from "react";
import CountryCard from "../CountryCard/CountryCard";
import "./Countries.scss";
import { VscError } from "react-icons/vsc";
import { LoadingOutlined } from "@ant-design/icons";
import type { Country, SortField, SortOrder } from "../../types/country";
import sortCountries from "../../utils/countries";
import { useFetchCountries } from "../../hooks/api/useFetchCountries";
import CountriesControls from "../CountriesControls/CountriesControls";
import { Flex, Spin } from "antd";

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
    fields: "name,flags,population,capital,languages",
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

  return (
    <div className="countries-container">
      <CountriesControls
        search={search}
        sortField={sortField}
        sortOrder={sortOrder}
        countriesCount={filtered.length}
        onSearchChange={(e) => setSearch(e.target.value)}
        onSortFieldChange={setSortField}
        onSortOrderChange={setSortOrder}
      />
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
