export interface User {
  name: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  city: string;
  state: string;
  pincode: number;
  resetToken: string;
  resetTokenExpiry: Date;
}
