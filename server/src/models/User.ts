export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: "admin | user";
  createdAt: Date;
  updatedAt: Date;
}
