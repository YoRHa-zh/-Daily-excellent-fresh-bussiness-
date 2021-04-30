import Cookie from 'js-cookie';

export function getCookie() {
  return {
    username: Cookie.get('username'),
    email: Cookie.get('email'),
    appkey: Cookie.get('appkey'),
    role: Cookie.get('role'),
  };
}

export function setCookie(userInfo) {
  const array = Object.entries(userInfo);
  for (let i = 0; i < array.length; i += 1) {
    Cookie.set(array[i][0], array[i][1]);
  }
  return getCookie();
}

export function removeCookie() {
  Cookie.remove('username');
  Cookie.remove('email');
  Cookie.remove('appkey');
  Cookie.remove('role');
}
