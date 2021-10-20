import { fetchApi } from "./lib/fetchApi.js";
import { filteringAnArray } from "./lib/filteringArray.js";

let data = await fetchApi("http://localhost:1337/articles");
console.log(data);

const loading = document.querySelector(".loading");

const search = document.querySelector(".search");
const searchResults = document.querySelector(".container");

data.forEach((element) => {
  document.querySelector(".container").innerHTML += `

<div class="card col3" style="width: 18rem;" >
<div class="card-body">
<h2>${element.id}<h2>
<h5>${element.title}<h5>
<p>${element.author}<p>
<i class="far fa-star"></i>
</div>
</div>`;
});
search.onkeyup = function () {
  searchResults.innerHTML = ``;

  let filteredArray = filteringAnArray(data, search.value);

  if (filteredArray.length === 0) {
    searchResults.innerHTML = "THIS IS EMPTY";
    return;
  }

  filteredArray.forEach((element) => {
    loading.innerHTML = ``;
    document.querySelector(".container").innerHTML += `
    <div class="card col3" style="width: 18rem;" >
    <div class="card-body">
    <h2>${element.id}<h2>
    <h5>${element.title}<h5>
    <p>${element.author}<p>
    <i class="far fa-star"></i>
    </div>
    </div>`;
  });
  console.log(filteredArray);

};
