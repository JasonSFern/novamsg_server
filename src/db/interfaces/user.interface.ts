export interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}