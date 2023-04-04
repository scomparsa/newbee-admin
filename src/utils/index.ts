export function localGet(key: string) {
  const value = window.localStorage.getItem(key);
  try {
    return JSON.parse(window.localStorage.getItem(key) as string);
  } catch (error) {
    return value;
  }
}

export function localSet(key: string, value: string) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function localRemove(key: string) {
  window.localStorage.removeItem(key);
}

export const pathMap = {
  login: "登录",
  index: "首页",
  add: "添加商品",
};
