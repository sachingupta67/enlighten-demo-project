export const storeItem = (key, item) => {
  let jsonOfItem = window.localStorage.setItem(key, JSON.stringify(item));
  return jsonOfItem;
};

export const getItem = (key) => {
  const retrievedItem = window.localStorage.getItem(key);
  const item = JSON.parse(retrievedItem);
  return item;
};

export const removeItem = (key) => {
  window.localStorage.removeItem(key);
};
