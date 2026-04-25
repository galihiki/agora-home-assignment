import type { ChangeEvent } from "react";
import type { SelectChangeEvent } from "@mui/material/Select";

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  agree: boolean;
}

export type WizardChangeEvent =
  | ChangeEvent<HTMLInputElement | HTMLSelectElement>
  | SelectChangeEvent<string>;

export interface StepComponentProps {
  formData: FormData;
  onChange: (event: WizardChangeEvent) => void;
  onErrorChange: (hasError: boolean) => void;
}
