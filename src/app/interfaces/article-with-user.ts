import { Article } from '../interfaces/article';
import { UserData } from '../interfaces/user';
export interface ArticleWithUser extends Article, UserData {}
