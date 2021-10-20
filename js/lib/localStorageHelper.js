export const saveToLocalStorage = function (keyName, arrayOfGroceries) {
	localStorage.setItem(keyName, JSON.stringify(arrayOfGroceries));
};

export const getStorageItem = function (keyName) {
	if (localStorage.getItem(keyName) !== null) {
		return JSON.parse(localStorage.getItem(keyName));
	} else {
		return [];
	}
};
