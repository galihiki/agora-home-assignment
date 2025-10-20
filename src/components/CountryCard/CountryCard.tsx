import "./CountryCard.scss";
import { BsPeopleFill } from "react-icons/bs";
import { GiCapitol } from "react-icons/gi";
import type { CountryCardProps } from "@/types/Country";

export default function CountryCard({
  name,
  flag,
  capital,
  population,
}: CountryCardProps) {
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
          <BsPeopleFill />
          <p>{population.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
