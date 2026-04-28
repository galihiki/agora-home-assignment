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
import { validateStep } from "../wizardValidation";

export default function Location({
  formData,
  onChange,
}: StepComponentProps) {
  const [touched, setTouched] = useState(false);
  const { errors } = validateStep(3, formData);
  const countryError = touched ? (errors.country ?? "") : "";

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event as any);
    if (!touched) {
      setTouched(true);
    }
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
