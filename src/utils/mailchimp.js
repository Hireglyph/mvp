import jsonp from "jsonp";

const listUrl =
  'https://hireglyph.us1.list-manage.com/subscribe/post?u=04e7de515f8682261e4fd1984&amp;id=d1db2890af'

export const subscribeToMailchimp = (email) => {
  const fields = ['EMAIL'];
  const values = fields.map(field => {
    return `${field}=${encodeURIComponent(email)}`;
  }).join("&");
  const path = `${listUrl}&${values}`;
  const url = path.replace('/post?', '/post-json?');

  jsonp(url, { param: "c" }, (err, data) => {});
};
