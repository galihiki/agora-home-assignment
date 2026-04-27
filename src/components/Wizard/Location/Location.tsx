import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { StepComponentProps } from "types/wizard";

export default function Location({
  formData,
  onChange,
  onErrorChange,
}: StepComponentProps) {
  const [touched, setTouched] = useState(false);

  const getCountryError = (country = formData.country) => {
    if (!touched) return "";
    if (!country) {
      return "Country is mandatory";
    }
    return "";
  };

  const countryError = getCountryError();

  const reportErrors = (country = formData.country) => {
    const error = getCountryError(country);
    onErrorChange(!!error);
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    onChange(event as any);
    if (!touched) {
      setTouched(true);
    }
    reportErrors(value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormControl fullWidth variant="outlined" error={!!countryError}>
        <InputLabel>Country</InputLabel>
        <Select
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
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
        {countryError && <FormHelperText>{countryError}</FormHelperText>}
      </FormControl>
    </Box>
  );
}
