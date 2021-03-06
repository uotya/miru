import { firestore } from 'firebase';
export interface Article {
  articleId: string;
  authorId: string;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
  title: string;
  description?: string;
  links: [
    { link: string; comment: string; ogTitle: string; faviconURL: string }
  ];
  thumbnailURL?: string;
  favorite: number;
}
