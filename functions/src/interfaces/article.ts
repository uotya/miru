import { firestore } from 'firebase';

export interface Article {
  articleId: string;
  authorId: string;
  createdAt: firestore.Timestamp;
  title: string;
  description?: string;
  links: [];
  comment?: string;
  thumbnailURL?: string;
  favorite: number;
}
