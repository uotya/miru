export interface Article {
  authorId: string;
  createdAt: Date;
  title: string;
  description?: string;
  links: [];
  comment?: string;
  thumbnailURL?: string;
  favorite: number;
}
