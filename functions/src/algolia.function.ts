import * as functions from 'firebase-functions';
const algoliasearch = require('algoliasearch');

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex('articles');

const addRecords = (article: any) => {
  const records = article.comments.map((comment: any, i: number) => {
    return {
      ...article,
      objectID: article.articleId + '-' + i,
      comments: comment
    };
  });
  return Promise.all(
    records.forEach((record: any) => index.saveObject(record))
  );
};

export const addIndex = (data: any) => {
  const article = {
    articleId: data.articleId,
    objectID: data.articleId,
    title: data.title,
    comments: data.links.map((link: any) => link.comment),
    description: data.description,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis()
  };

  const commentsLength = article.comments.reduce(
    (accumulator: number, comment: any) => {
      return accumulator + comment?.length;
    },
    0
  );

  if (
    article.title.length + article.description?.length + commentsLength >
    500
  ) {
    return addRecords(article);
  } else {
    return index.saveObject(article);
  }
};

export const removeIndex = (id: string) => {
  return index.deleteBy({ filters: `articleId:${id}` });
};

export const updateIndex = async (article: any) => {
  await removeIndex(article.articleId);
  addIndex(article);
};
