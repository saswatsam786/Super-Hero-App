console.log("THIS IS WORKING!!");
// 2373947842742013

const apiKey = 2373947842742013;

const url = `https://www.superheroapi.com/api.php/${apiKey}/search/`;

let form = document.getElementById("form-control");

form.addEventListener("input", (e) => {
  const searchString = e.target.value;
  let str = form.value;
  console.log("Searching For: ", searchString);
  if (searchString.length < 3)
    document.getElementById("cards").innerHTML = "Add at least 3 characters";
  else {
    document.getElementById("cards").innerHTML = "";
    setTimeout(getData(searchString), 10000);
  }
});

// let char = prompt("Enter character");

async function getData(str) {
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
      view(obj);
    });
}

let cards = document.getElementById("cards");

function view(obj) {
  let cardinfo;
  obj.forEach((element) => {
    cardinfo += `<div class="card" style="width: 18rem">
    <img
      src=${JSON.stringify(element["image"].url)}
      class="card-img-top"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title">${JSON.stringify(element["name"])}</h5>
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
        <li>${JSON.stringify(
          element["biography"]["first-appearance"]
        )}</span></li>
      </ul>
      <a href="#" class="btn btn-dark">Add To Favourites</a>
    </div>`;
    cards.innerHTML = cardinfo;

    console.log(cards);
  });
}
