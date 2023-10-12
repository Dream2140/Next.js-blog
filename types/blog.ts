export interface IBlog {
  id: string;
  name: string;
  createdAt: Date;
  image: string;
  text: string;
  userId: string;
  likedIds: string[];
}
