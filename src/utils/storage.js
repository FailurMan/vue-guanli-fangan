/* 
  存储数据
*/
export function setItem(key, value) {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
}
/* 
  获取数据
*/
export function getItem(key, value) {
  const data = window.localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
}
/* 
  删除指定数据
*/
export function removeItem(key) {
  window.localStorage.removeItem(key);
}
/* 
  删除所有数据
*/
export function removeAllItem() {
  window.localStorage.clear();
}
