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

export default function CountriesControls({
  search,
  countriesCount,
  onSearchChange,
  onSortFieldChange,
  onSortOrderChange,
}: CountriesControlsProps) {
  return (
    <div className="countries-header">
      <h2 className="title">Countries ({countriesCount})</h2>

      {/* Controls */}
      <div className="controls">
        <Input
          type="text"
          style={{ height: 40 }}
          placeholder="Search countries..."
          value={search}
          onChange={onSearchChange}
        />

        <Select
          defaultValue="name"
          className="field select"
          onChange={onSortFieldChange}
          options={[
            { value: "name", label: "Sort by Name" },
            { value: "population", label: "Sort by Population" },
          ]}
        />

        <Select
          defaultValue="asc"
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
