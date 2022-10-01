export interface Customer {
  no?: number;
  customerId?: string;
  name: string;
  birthday: Date;
  gender: "MALE" | "FEMALE";
  address: string;
  phoneNumber: string;
  favoriteItems: string[];
}

