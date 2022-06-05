export const summarizeStr = (str, num) => {
  if (str.length <= num) {
    return str;
  } else {
    return str.slice(0, num) + "...";
  }
};

export const updateArr = (exArray, element) => {
  let newArr = [...exArray];
  const updatedEl = newArr.find((el) => el.id === element.id);
  const index = newArr.indexOf(updatedEl);
  newArr.splice(index, 1, element);
  return newArr;
};

export const joinClass = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const showAndRemovePopup = (func, type) => {
  func({
    type: type,
    data: true,
  });
  setTimeout(() => {
    func({
      type: type,
      data: false,
    });
  }, 2500);
};

export const findDirName = (allDirs, id) => {
  const dirName = allDirs.find((el) => el.id === id);
  if (dirName) return dirName.name;
  return null;
};
