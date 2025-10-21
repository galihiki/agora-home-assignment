import "./CountryCard.scss";
import { BsPeopleFill } from "react-icons/bs";
import { GiCapitol } from "react-icons/gi";
import { Tooltip } from "antd";

interface CountryCardProps {
  name: string;
  flag: string;
  capital?: string;
  population: number;
}

export default function CountryCard({
  name,
  flag,
  capital,
  population,
}: CountryCardProps) {
  return (
    <div className="country-card">
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
