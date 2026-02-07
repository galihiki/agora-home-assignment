import React from "react";
import { type ChangeEvent } from "react";
import { Input, Select } from "antd";
import type { SortField, SortOrder } from "../../types/country";
import "./CountriesControls.scss";

interface CountriesControlsProps {
  search: string;
  sortField: SortField;
  sortOrder: SortOrder;
  countriesCount: number;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSortFieldChange: (value: SortField) => void;
  onSortOrderChange: (value: SortOrder) => void;
}

function CountriesControls({
  search,
  sortField,
  sortOrder,
  countriesCount,
  onSearchChange,
  onSortFieldChange,
  onSortOrderChange,
}: CountriesControlsProps) {
  console.log("Child render");
  return (
    <div className="countries-header">
      <h2 className="title">Countries ({countriesCount})</h2>

      {/* Controls */}
      <div className="controls">
        <Input
          type="text"
          placeholder="Search countries..."
          value={search}
          onChange={onSearchChange}
        />

        <Select
          value={sortField}
          className="field select"
          onChange={onSortFieldChange}
          options={[
            { value: "name", label: "Sort by Name" },
            { value: "population", label: "Sort by Population" },
          ]}
        />

        <Select
          value={sortOrder}
          className="order select"
          onChange={onSortOrderChange}
          options={[
            { value: "asc", label: "Ascending" },
            { value: "desc", label: "Descending" },
          ]}
        />
      </div>
    </div>
  );
}

export default React.memo(CountriesControls);
