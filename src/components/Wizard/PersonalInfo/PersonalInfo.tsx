import { TextField, Box } from "@mui/material";
import { useState, type ChangeEvent } from "react";
import type { StepComponentProps } from "types/wizard";

export default function PersonalInfo({
  formData,
  onChange,
  onErrorChange,
}: StepComponentProps) {
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
  });

  const validateName = (name: string): string => {
    if (!name || name.trim() === "") {
      return "Field is mandatory";
    }
    if (name.trim().length < 2) {
      return "Must be at least 2 characters";
    }
    return "";
  };

  const getFieldError = (
    field: "firstName" | "lastName",
    value = formData[field],
    touchedState = touched
  ) => {
    if (!touchedState[field]) return "";
    return validateName(value);
  };

  const firstNameError = getFieldError("firstName");
  const lastNameError = getFieldError("lastName");

  const reportErrors = (
    firstName = formData.firstName,
    lastName = formData.lastName,
    touchedState = touched
  ) => {
    const firstError = getFieldError("firstName", firstName, touchedState);
    const lastError = getFieldError("lastName", lastName, touchedState);
    onErrorChange(!!firstError || !!lastError);
  };

  const handleChange =
    (field: "firstName" | "lastName") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const nextTouched = { ...touched, [field]: true };
      onChange(event);
      if (!touched[field]) {
        setTouched(nextTouched);
      }
      if (field === "firstName") {
        reportErrors(value, formData.lastName, nextTouched);
      } else {
        reportErrors(formData.firstName, value, nextTouched);
      }
    };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange("firstName")}
        placeholder="Enter your first name"
        fullWidth
        variant="outlined"
        error={!!firstNameError}
        helperText={firstNameError}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange("lastName")}
        placeholder="Enter your last name"
        fullWidth
        variant="outlined"
        error={!!lastNameError}
        helperText={lastNameError}
      />
    </Box>
  );
}
