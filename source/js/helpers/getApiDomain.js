import getTLD from './getTLD';

export default () => {
  return (getTLD() === 'website') ? 'https://api.goodandcheap.website' : 'http://api.goodandcheap.test';
}
