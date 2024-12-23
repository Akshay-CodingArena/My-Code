export const getOS = () => {
  let userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (
    userAgent.match(/iPad/i) ||
    userAgent.match(/iPhone/i) ||
    userAgent.match(/iPod/i)
  ) {
    return "ios";
  } else if (userAgent.match(/Android/i)) {
    return "android";
  } else {
    return "desktop";
  }
};
