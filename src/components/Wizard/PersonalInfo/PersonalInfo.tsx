import { TextField, Box } from "@mui/material";
import { useState, useEffect, type ChangeEvent } from "react";
import type { StepComponentProps } from "types/wizard";

export default function PersonalInfo({
  formData,
  onChange,
  onErrorChange,
}: StepComponentProps) {
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");

  const validateName = (name: string, fieldName: string): string => {
    if (!name || name.trim() === "") {
      return `${fieldName} is mandatory`;
    }
    if (name.trim().length < 2) {
      return `${fieldName} must be at least 2 characters`;
    }
    return "";
  };

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    const error = validateName(event.target.value, "First Name");
    setFirstNameError(error);
  };

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    const error = validateName(event.target.value, "Last Name");
    setLastNameError(error);
  };

  const handleFirstNameBlur = () => {
    const error = validateName(formData.firstName, "First Name");
    setFirstNameError(error);
  };

  const handleLastNameBlur = () => {
    const error = validateName(formData.lastName, "Last Name");
    setLastNameError(error);
  };

  useEffect(() => {
    const hasError =
      !!validateName(formData.firstName, "First Name") ||
      !!validateName(formData.lastName, "Last Name");
    onErrorChange(hasError);
  }, [formData.firstName, formData.lastName, onErrorChange]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleFirstNameChange}
        onBlur={handleFirstNameBlur}
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
        onChange={handleLastNameChange}
        onBlur={handleLastNameBlur}
        placeholder="Enter your last name"
        fullWidth
        variant="outlined"
        error={!!lastNameError}
        helperText={lastNameError}
      />
    </Box>
  );
}
