import { useRef, useState, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import CountryCard from "../CountryCard/CountryCard";
import type { Country } from "../../types/country";

interface CountriesVirtualProps {
  countries?: Country[]; // optional, default []
  isSelected: (name: string) => boolean;
  onSelect: (name: string) => void;
  containerHeight?: number;
  cardWidth?: number;
  cardHeight?: number;
  gap?: number;
}

export default function CountriesVirtual({
  countries = [], // default empty array
  isSelected,
  onSelect,
  containerHeight = 600,
  cardWidth = 200,
  cardHeight = 220,
  gap = 16,
}: CountriesVirtualProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = useState(1);

  // Calculate number of columns dynamically based on container width
  useEffect(() => {
    if (!containerRef.current) return;

    const updateColumns = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const count = Math.max(1, Math.floor(width / (cardWidth + gap)));
      setColumnCount(count);
    };

    updateColumns(); // initial calculation

    const resizeObserver = new ResizeObserver(updateColumns);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [cardWidth, gap]);

  // Calculate number of rows
  const rowCount =
    countries.length === 0 ? 0 : Math.ceil(countries.length / columnCount);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => containerRef.current,
    estimateSize: () => cardHeight + gap,
    overscan: 3,
  });

  const virtualRows = rowVirtualizer.getVirtualItems?.() || [];

  return (
    <div
      ref={containerRef}
      style={{
        height: containerHeight,
        overflowY: "auto",
        position: "relative",
      }}
    >
      <div
        style={{
          height: rowVirtualizer.getTotalSize?.() || 0,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualRows.map((virtualRow) => {
          const rowIndex = virtualRow.index;
          const top = virtualRow.start;

          return (
            <div
              key={rowIndex}
              style={{
                position: "absolute",
                top,
                left: 0,
                display: "flex",
                gap,
                width: "100%",
              }}
            >
              {Array.from({ length: columnCount }).map((_, colIndex) => {
                const countryIndex = rowIndex * columnCount + colIndex;
                if (countryIndex >= countries.length) return null;

                const country = countries[countryIndex];

                return (
                  <div
                    key={country.name.common}
                    style={{ width: cardWidth, height: cardHeight }}
                  >
                    <CountryCard
                      name={country.name.common}
                      flag={country.flags.png}
                      capital={country.capital?.[0]}
                      population={country.population}
                      isSelected={isSelected(country.name.common)}
                      onSelect={onSelect}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
