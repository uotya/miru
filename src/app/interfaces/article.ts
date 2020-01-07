export interface Article {
  avatarURL: string;
  userName: string;
  userId: string;
  title: string;
  description?: string;
  link?: string;
  comment?: string;
  thumbURL: string;
  favorite: number;
}
