import { useEffect, useState } from "react";
import { capitals } from "./data";
import _ from "lodash";
import "./CapitalGame.scss";

export default function CapitalGame() {
  const [items, setItems] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  useEffect(() => {
    const data = Object.entries(capitals).flat();
    setItems(_.shuffle(data));
  }, []);

  function handleSelected(value: string) {
    const newSelected = selected.length === 2 ? [value] : [...selected, value];
    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (capitals[first] === second || capitals[second] === first) {
        setIsCorrect(true);
        setTimeout(() => {
          setItems(items.filter((item) => !newSelected.includes(item)));
          setIsCorrect(false);
        }, 1000);
      } else {
        setTimeout(() => {
          setSelected([]);
        }, 1000);
      }
    }
    setSelected(newSelected);
  }

  return (
    <div className="game-container">
      {items.map((item) => {
        const isSelected = selected.includes(item);
        return (
          <button
            className={`card ${isSelected ? "selected" : ""} ${
              isSelected && isCorrect ? "correct" : ""
            } ${
              isSelected && !isCorrect && selected.length === 2 ? "wrong" : ""
            }`}
            onClick={() => handleSelected(item)}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
