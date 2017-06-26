export default function() {
  let hostName = window.location.hostname,
      hostNameArray = hostName.split('.'),
      posOfTld = hostNameArray.length - 1,
      tld = hostNameArray[posOfTld]
  return tld
}
