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
import { getNames } from "country-list";
import type { StepComponentProps } from "types/wizard";
import { validateStep } from "../wizardValidation";

const countries = getNames();

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
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            slotProps: {
              paper: {
                sx: {
                  maxHeight: 250,
                },
              },
            },
          }}
        >
          <MenuItem value="">
            <em>Select a country</em>
          </MenuItem>
          {countries.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
        {countryError && <FormHelperText>{countryError}</FormHelperText>}
      </FormControl>
    </Box>
  );
}
