let searchText = document.getElementById("search-text");
let searchButton = document.getElementById("search-button");
let img = document.querySelector(".img-movie img");
let nameMovie = document.querySelector(".about-movie h2");
let rate = document.getElementById("rate");
let rated = document.getElementById("rated");
let released = document.getElementById("released");
let runtime = document.getElementById("runtime");
let gener = document.querySelector(".gener");
let plot = document.querySelector(".plot p");
let cast = document.querySelector(".cast p");
let details = document.querySelector(".details");
let container = document.querySelector(".container");
searchButton.onclick = function () {
  if (searchText.value !== "") {
    fetch(`http://www.omdbapi.com/?t=${searchText.value}&apikey=2541cfb3`)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }
};

function setData(data) {
  if (window.innerWidth <= 760) {
    container.classList.add("top-plus");
  } else {
    container.classList.remove("top-plus");
  }
  img.src = "";
  details.classList.remove("hidden");
  let {
    Rated,
    Title,
    Released,
    Runtime,
    Genre,
    Plot,
    Ratings,
    Actors,
    Poster,
  } = data;
  nameMovie.innerHTML = Title;
  plot.innerHTML = Plot;
  cast.innerHTML = Actors;
  if (Poster !== "") img.src = Poster;
  else img.src = "/img/noPoster.jpg";
  rate.innerHTML = Ratings[0].Value;
  released.innerHTML = Released;
  rated.innerHTML = Rated;
  runtime.innerHTML = Runtime;
  let geners = Genre.split(",");
  gener.innerHTML = "";
  for (let i = 0; i < geners.length; i++) {
    let span = document.createElement("span");
    span.innerHTML = geners[i];
    gener.appendChild(span);
  }
  searchText.value = "";
}
