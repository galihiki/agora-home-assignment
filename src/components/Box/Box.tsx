import { useState } from "react";
import "./Box.scss";

export default function Box() {
  const [countArray, setCountArray] = useState<Boolean[]>([]);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setCountArray([...countArray, true]);
  }
  return (
    <div className="box" onClick={handleClick}>
      <div className="container">
        {countArray.map((_, index) => (
          <Box key={index} />
        ))}
      </div>
    </div>
  );
}
