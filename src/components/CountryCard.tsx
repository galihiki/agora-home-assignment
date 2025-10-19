import React from "react";
import "./CountryCard.scss";
import { BsPeopleFill } from "react-icons/bs";
import { GiCapitol } from "react-icons/gi";

interface CountryCardProps {
  name: string;
  flag: string;
  capital?: string;
  population: number;
}

const CountryCard: React.FC<CountryCardProps> = ({
  name,
  flag,
  capital,
  population,
}) => {
  return (
    <div className="country-card">
      <div className="country-header">
        <h3>
          {name}
          <span className="tooltiptext">{name}</span>
        </h3>
        <img src={flag} alt={name} className="country-flag" />
      </div>
      <div className="country-info">
        <div className="info-container">
          <GiCapitol />
          <p>{capital || "N/A"}</p>
        </div>
        <div className="info-container">
          <BsPeopleFill /> <p>{population.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
