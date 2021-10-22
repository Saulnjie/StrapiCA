import { fetchApi } from "./lib/fetchApi.js";
// import { filteringAnArray } from "./lib/filteringArray.js";
import {
	saveToLocalStorage,
	getStorageItem,
} from "./lib/localStorageHelper.js";

let data = await fetchApi("http://localhost:1337/articles");
console.log(data);



const favouritesArray = getStorageItem("favourites");
if (favouritesArray.length === 0) {
    document.querySelector('.error').innerHTML = 'No items are stored';
    
 } else {
        document.querySelector('.error').innerHTML = '';
        favouritesArray.forEach((element) => {
            document.querySelector(".favourites-container").innerHTML += `
          <div class="card col3" style="width: 18rem;" >
          <div class="card-body">
          <h2>${element.id}<h2>
          <h5>${element.title}<h5>
          <p>${element.author}<p>
          <i class="far fa-star" data-id="${element.id}" data-title="${element.title}" data-author="${element.author}"></i>
          </div>
          </div>`;
          });
    };
    const removeItem = document.querySelector(".reset-btn");

    removeItem.onclick = function () {
        localStorage.clear();
        document.querySelector(".favourites-container").innerHTML = "";
        document.querySelector('.error').innerHTML = 'No items are stored';
      };
   