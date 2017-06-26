import getTLD from './getTLD'

export default function() {
  let apiDomain = (getTLD() === 'website') ? 'https://api.goodandcheap.website' : 'http://api.goodandcheap.dev'
  return apiDomain
}
