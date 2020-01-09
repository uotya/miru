export interface OGP {
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  ogUrl: string;
  ogType?: string;
  ogTitle: string;
  ogSiteName: string;
  ogLocale?: string;
  ogDescription?: string;
  ogImage?: {
    url: string;
    width: string;
    height: string;
    type: string;
  };
  twitterImage?: {
    url: string;
  };
}
