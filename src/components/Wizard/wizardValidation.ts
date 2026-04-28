import type { FormData } from "types/wizard";

export type WizardFieldErrors = Partial<Record<keyof FormData, string>>;

const validateName = (name: string): string => {
  if (!name.trim()) {
    return "Field is mandatory";
  }
  if (name.trim().length < 2) {
    return "Must be at least 2 characters";
  }
  return "";
};

const validateEmail = (email: string): string => {
  if (!email.trim()) {
    return "Email is mandatory";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return "";
};

const validatePhone = (phone: string): string => {
  if (!phone.trim()) {
    return "Phone number is mandatory";
  }
  const phoneRegex = /^\+?[0-9]{7,15}$/;
  if (!phoneRegex.test(phone)) {
    return "Phone number must be 7-15 digits and may start with +";
  }
  return "";
};

const validateCountry = (country: string): string => {
  if (!country.trim()) {
    return "Country is mandatory";
  }
  return "";
};

export const validateStep = (
  stepId: number,
  formData: FormData,
): { errors: WizardFieldErrors; isValid: boolean } => {
  const errors: WizardFieldErrors = {};

  if (stepId === 1) {
    const firstNameError = validateName(formData.firstName);
    const lastNameError = validateName(formData.lastName);
    if (firstNameError) {
      errors.firstName = firstNameError;
    }
    if (lastNameError) {
      errors.lastName = lastNameError;
    }
  }

  if (stepId === 2) {
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    if (emailError) {
      errors.email = emailError;
    }
    if (phoneError) {
      errors.phone = phoneError;
    }
  }

  if (stepId === 3) {
    const countryError = validateCountry(formData.country);
    if (countryError) {
      errors.country = countryError;
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
