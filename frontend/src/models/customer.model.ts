export interface Customer {
  name: string;
  birthday: Date;
  gender: "MALE" | "FEMALE";
  address: string;
  phoneNumber: string;
  favoriteItems: string[];
}
