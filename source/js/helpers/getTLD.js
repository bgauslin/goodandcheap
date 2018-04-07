export default () => {
  const hostName = window.location.hostname;
  const hostNameArray = hostName.split('.');
  const posOfTld = hostNameArray.length - 1;
  const tld = hostNameArray[posOfTld];
  return tld;
}
