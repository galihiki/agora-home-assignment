import { Intro } from "../intro/intro";
import { Stack } from "@chakra-ui/react";
import { columns } from "../columns/columns";
import content from "../../../data/table-data.json";
import "./Table.scss";

export default function Table() {
  return (
    <Stack direction="column" gap={6} className="table-container">
      <Intro />
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.id}>{column.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.map((item) => {
            return (
              <tr>
                {columns.map((column) => {
                  return <td>{column.cellContent(item)}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Stack>
  );
}
