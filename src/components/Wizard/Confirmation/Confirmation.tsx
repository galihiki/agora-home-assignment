import {
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";
import { type ChangeEvent } from "react";

interface ConfirmationProps {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  agree: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Confirmation({
  firstName,
  lastName,
  email,
  country,
  agree,
  onChange,
}: ConfirmationProps) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Review Your Information
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
          <Typography variant="body2" color="text.secondary">
            First Name:
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            {firstName || "Not provided"}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Last Name:
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            {lastName || "Not provided"}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Email:
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            {email || "Not provided"}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Country:
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            {country || "Not provided"}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <FormControlLabel
        control={
          <Checkbox
            checked={agree}
            onChange={onChange}
            name="agree"
            color="primary"
          />
        }
        label="I confirm all information is correct"
      />
    </Box>
  );
}
