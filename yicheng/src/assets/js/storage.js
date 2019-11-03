const controlStorage = (key, type = 'get', val) => {
  if (type == 'set' && !!val) { // 存
    localStorage.setItem(key, JSON.stringify(val));
  } else if (type == 'remove') { //删
    localStorage.removeItem(key);
  } else { // 取
    let localStorageObj = !!localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : '';
    return localStorageObj;
  }
};

export default controlStorage;
