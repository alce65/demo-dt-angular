export interface LoginData {
  email: string; // From Input email
  passwd: string; // From Input password
}

export interface RegisterData {
  email: string; // From Input email
  passwd: string; // From Input password
  firstName: string; // From Input text
  surname: string; // From Input text
  gender: string; // Gender; // From RadioButtons
  country: string; // Country; // From Select
  birthDateIso: string; // From DatePicker
  bio: string; // From TextArea
  termsAcceptance: boolean; // From Checkbox
}

export interface UserData {
  id: string;
  email: string;
  firstName: string;
  surname: string;
  gender: string;
  country: string;
  birthDateIso: string;
  bio: string;
  termsAcceptance: boolean;
  role: string;
  token: string;
}

export interface User extends Omit<UserData, 'birthDateIso' | 'token'> {
  birthDate: Date;
}
