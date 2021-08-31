console.log("THIS IS WORKING!!");
// 2373947842742013

const apiKey = 2373947842742013;

const url = `https://www.superheroapi.com/api.php/${apiKey}/search/`;

let form = document.getElementById("form-control");

form.addEventListener("keyup", (e) => {
  const searchString = e.target.value;
  let str = form.value;
  console.log("Searching For: ", searchString);
  if (searchString.length < 3)
    document.getElementById("cards").innerHTML = "Add at least 3 characters";
  else {
    setTimeout(getData(searchString), 1000);
  }
});

// let char = prompt("Enter character");
function getData(str) {
  console.log("Started getData");
  let url1 = url + str;
  fetch(url1)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data["results"]);
      let obj = data["results"];
      rendering(obj);
    });
}

function rendering(obj) {
  var results = document.getElementById("cards");
  results.remove();

  let container = document.getElementById("container");
  var results = document.createElement("div");
  results.id = "cards";
  results.className = "cards";
  container.appendChild(results);
  obj.forEach((element) => {
    console.log(element.name);
    results.appendChild(getCard(element));

    console.log(results);
  });
}

function getCard(element) {
  let cards = document.createElement("div");
  cards.classList = "h-100";
  cards.classList = "card";
  cards.style.width = "18rem";

  console.log(element);

  cards.innerHTML = `
    <img
      src=${JSON.stringify(element["image"].url)}
      class="card-img-top"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title">${element["name"]}</h5>
      <ul class="card-text">
        <li>Full Name: <span> ${JSON.stringify(
          element["biography"]["full-name"]
        )}</span></li>
        <li>Birth Place: <span> ${JSON.stringify(
          element["biography"]["place-of-birth"]
        )}</span></li>
        <li>Powerstats: <span> ${JSON.stringify(
          Math.round(
            (JSON.parse(element["powerstats"]["intelligence"]) +
              JSON.parse(element["powerstats"]["strength"]) +
              JSON.parse(element["powerstats"]["speed"]) +
              JSON.parse(element["powerstats"]["durability"]) +
              JSON.parse(element["powerstats"]["power"]) +
              JSON.parse(element["powerstats"]["combat"])) /
              6
          )
        )}</span></li>
        <li>First Appearance: <span>${JSON.stringify(
          element["biography"]["first-appearance"]
        )}</span></li>
      </ul>
      <button onclick={handleFavClick()} class="btn btn-dark" >Add To Favourites</button>
    `;

  return cards;
}

function handleFavClick(element) {
  console.log(element);
  console.log("working");
}
