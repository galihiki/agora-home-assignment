import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import { type SelectChangeEvent } from "@mui/material/Select";

interface LocationProps {
  country: string;
  onChange: (event: SelectChangeEvent<string>) => void;
}

export default function Location({ country, onChange }: LocationProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel>Country</InputLabel>
        <Select
          label="Country"
          name="country"
          value={country}
          onChange={onChange}
        >
          <MenuItem value="">
            <em>Select a country</em>
          </MenuItem>
          <MenuItem value="usa">United States</MenuItem>
          <MenuItem value="uk">United Kingdom</MenuItem>
          <MenuItem value="canada">Canada</MenuItem>
          <MenuItem value="france">France</MenuItem>
          <MenuItem value="germany">Germany</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
