export interface ArticleWithUser {
  userId: string;
  title: string;
  description?: string;
  links: [];
  comment?: string;
  thumbURL?: string;
  favorite: number;
  avatarURL: string;
  userName: string;
}
