export interface Article {
  userId: string;
  title: string;
  description?: string;
  links: [];
  comment?: string;
  thumbURL: string;
  favorite: number;
}
