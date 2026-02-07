import { useMemo, useState, useCallback } from "react";
import CountryCard from "../CountryCard/CountryCard";
import "./Countries.scss";
import { VscError } from "react-icons/vsc";
import { LoadingOutlined } from "@ant-design/icons";
import type { Country, SortField, SortOrder } from "../../types/country";
import sortCountries from "../../utils/countries";
import CountriesControls from "../CountriesControls/CountriesControls";
import { Flex, Spin } from "antd";
import { useCountriesContext } from "../../context/CountriesContext";

export default function Countries() {
  const [search, setSearch] = useState<string>("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [selected, setSelected] = useState<string[]>([]);

  const { countries, isLoading, error } = useCountriesContext();

  const errorMessage =
    "Sorry, we couldn’t load the countries. Please try again later.";

  // Filter and sort
  const filtered = useMemo(() => {
    if (!countries) return [];

    const query = search.toLowerCase();
    const result =
      query === ""
        ? countries
        : countries.filter((c) => c.name.common.toLowerCase().includes(query));

    return sortCountries(result, sortField, sortOrder);
  }, [countries, search, sortField, sortOrder]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    [],
  );

  const handlesortFieldChanged = useCallback((value: SortField) => {
    setSortField(value);
  }, []);

  const handleSortOrderChanged = useCallback((value: SortOrder) => {
    setSortOrder(value);
  }, []);

  const handleSelected = useCallback((value: string) => {
    setSelected((pre) => [...pre, value]);
  }, []);

  function isSelected(currName: string) {
    return !!selected.find((name) => name === currName);
  }

  return (
    <div className="countries-container">
      <CountriesControls
        search={search}
        sortField={sortField}
        sortOrder={sortOrder}
        countriesCount={filtered.length}
        onSearchChange={handleSearchChange}
        onSortFieldChange={handlesortFieldChanged}
        onSortOrderChange={handleSortOrderChanged}
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
          {filtered.map((country) => (
            <CountryCard
              key={country.name.common}
              name={country.name.common}
              flag={country.flags.png}
              capital={country.capital?.[0]}
              population={country.population}
              isSelected={isSelected(country.name.common)}
              onSelect={handleSelected}
            />
          ))}
        </div>
      )}
    </div>
  );
}
