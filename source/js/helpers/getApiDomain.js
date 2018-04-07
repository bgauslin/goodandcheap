import getTLD from './getTLD';

export default () => {
  let apiDomain = (getTLD() === 'website') ? 'https://api.goodandcheap.website' : 'http://api.goodandcheap.test';
  return apiDomain;
}
