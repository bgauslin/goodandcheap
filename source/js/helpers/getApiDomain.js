import getTLD from './getTLD'

export default function() {
  let apiDomain = (getTLD() === 'website') ? 'https://api.goodandcheap.website' : 'http://api.goodandcheap.local'
  return apiDomain
}
