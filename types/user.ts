export interface IUser {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  email: string;
  image: string | null;
  password: string | null;
}
