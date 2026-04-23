export interface IBlog {
  id: string;
  name: string;
  createdAt: string;
  image: string;
  text: string;
  userId: string;
  likedIds: string[];
}
