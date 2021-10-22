import { fetchApi } from "./lib/fetchApi.js";
import { filteringAnArray } from "./lib/filteringArray.js";
import {
	saveToLocalStorage,
	getStorageItem,
} from "./lib/localStorageHelper.js";

let data = await fetchApi("http://localhost:1337/articles");
console.log(data);


const search = document.querySelector(".search");
const searchResults = document.querySelector(".container");
const removeItem = document.querySelector(".reset-btn");


data.forEach((element) => {
  document.querySelector(".container").innerHTML += `
<div class="card col3" style="width: 18rem;" >
<div class="card-body">
<h2>${element.id}<h2>
<h5>${element.title}<h5>
<p>${element.author}<p>
<i class="far fa-star" data-id="${element.id}" data-title="${element.title}" data-author="${element.author}"></i>
</div>
</div>`;
});



let likes = document.querySelectorAll('.fa-star');
console.log('likes', likes);

likes.forEach((element) => {
	element.onclick = function () {
		element.classList.toggle('fas');
		console.log(element);
		// Data sets are used to store extra data
		// ======================================================
		console.log(element.dataset.id);
		console.log(element.dataset.title);
		console.log(element.dataset.author);
		// ======================================================

		// Creating an object to store to local storage
		let localStorageObject = {
			id: element.dataset.id,
			title: element.dataset.title,
			author: element.dataset.author,
}
	//Appending to what is in local storage
		// With the code below we are adding to local storage, never removing anything
		let favourites = getStorageItem('favourites');

		// Find Method in JS looks if something is in an array
		// if it is then it will return it or else it will return undefined

		let isInStorage = favourites.find(
			(productObject) => productObject.id === localStorageObject.id
		);

		console.log('isInStorage', isInStorage);

		if (isInStorage === undefined) {
			// Insert it into local storage
			favourites.push(localStorageObject);
			saveToLocalStorage('favourites', favourites);
		} else {
			// remove it from localstorage if its already there
			let removedElementArray = favourites.filter(
				(productObject) => productObject.id !== localStorageObject.id
			);

			// console.log('removedElementArray', removedElementArray);

			saveToLocalStorage('favourites', removedElementArray);
		}
	};

});



search.onkeyup = function () {
  searchResults.innerHTML = ``;

  let filteredArray = filteringAnArray(data, search.value);
  if (filteredArray.length === 0) {
    searchResults.innerHTML = "NOTHING TO SHOW";
    return;
  }

  filteredArray.forEach((element) => { 
    document.querySelector(".container").innerHTML += `
    <div class="card col3" style="width: 18rem;" >
    <div class="card-body">
    <h2>${element.id}<h2>
    <h5>${element.title}<h5>
    <p>${element.author}<p>
    <i class="far fa-star" data-id="${element.id}" data-price="${element.title}" data-title="${element.author}"></i>
    </div>
    </div>`;
  });
  console.log(filteredArray);

};

removeItem.onclick = function () {
  localStorage.clear();
  items.innerHTML = "";
};
