import getTLD from './getTLD'

export default function() {
  var myTLD = getTLD()

  if (myTLD === 'website') {
    var apiDomain = 'https://api.goodandcheap.website'
  } else {
    var apiDomain = 'http://api.goodandcheap.dev'
  }

  return apiDomain
}
