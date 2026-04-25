import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import { useEffect } from "react";
import type { StepComponentProps } from "types/wizard";

export default function Location({
  formData,
  onChange,
  onErrorChange,
}: StepComponentProps) {
  useEffect(() => {
    onErrorChange(!formData.country);
  }, [formData.country, onErrorChange]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel>Country</InputLabel>
        <Select
          label="Country"
          name="country"
          value={formData.country}
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
