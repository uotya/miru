const functions = require('firebase-functions');
const express = require('express');
const fetch = require('node-fetch');
const url = require('url');
const useragent = require('express-useragent');

const appUrl =
  functions.config().env.mode === 'prod'
    ? 'miru-prod.web.app'
    : 'miru-2ac6c.web.app';

const generateUrl = (req: any) => {
  return url.format({
    protocol: 'https',
    host: appUrl,
    pathname: req.originalUrl
  });
};

const app = express();

app.use(useragent.express());

app.get('*', async (req: any, res: any) => {
  console.log(req);
  if (req.useragent.isBot) {
    console.log('isBot');
    const rendertronAppURL = 'https://rendertron-uotya.appspot.com';
    const response = await fetch(
      `${rendertronAppURL}/render/${generateUrl(req)}`
    );
    const body = await response.text();
    res.set('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    res.set('Vary', 'User-Agent');
    res.send(body.toString());
  } else {
    console.log('noBot');
    fetch(`https://${appUrl}`)
      .then((result: any) => result.text())
      .then((body: any) => {
        res.send(body.toString());
      });
  }
});

export const render = functions.https.onRequest(app);
