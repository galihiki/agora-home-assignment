import "./CountryCard.scss";
import { BsPeopleFill } from "react-icons/bs";
import { GiCapitol } from "react-icons/gi";
import { Tooltip } from "antd";
import React from "react";

interface CountryCardProps {
  name: string;
  flag: string;
  capital?: string;
  population: number;
  isSelected: boolean;
  onSelect: (value: string) => void;
}

function CountryCard({
  name,
  flag,
  capital,
  population,
  isSelected,
  onSelect,
}: CountryCardProps) {
  console.log("card render!!!  " + isSelected + " " + name);
  return (
    <div
      className={isSelected ? "country-card selected" : "country-card"}
      onClick={() => onSelect(name)}
    >
      <div className="country-header">
        <Tooltip title={name}>
          <h3>{name}</h3>
        </Tooltip>
        <img src={flag} alt={name} className="country-flag" />
      </div>
      <div className="country-info">
        <div className="info-container">
          <GiCapitol />
          <p>{capital || "N/A"}</p>
        </div>
        <div className="info-container">
          <BsPeopleFill />
          <p>{population?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
export default React.memo(CountryCard);
