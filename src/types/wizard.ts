import type { ChangeEvent } from "react";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { ComponentType } from "react";

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  agree: boolean;
}

export type WizardChangeEvent =
  | ChangeEvent<HTMLInputElement | HTMLSelectElement>
  | SelectChangeEvent<string>;

export interface StepComponentProps {
  formData: FormData;
  onChange: (event: WizardChangeEvent) => void;
}

export interface WizardStep {
  id: number;
  title: string;
  description: string;
  component: ComponentType<StepComponentProps>;
}
