import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities);
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const response = await fetch(`${config.backendEndpoint}/cities`);
    const json = await response.json();
    return json;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  // This is creating div after HTML code in index.html
  const container = document.createElement("div");
  container.className = "col-lg-3 col-md-6 col-sm-6 my-3 ";

  const citiesLinks = document.createElement("a");
  citiesLinks.id = id;
  citiesLinks.href = `pages/adventures/?city=${id}`;

  const innerHTML = document.createElement("div");
  innerHTML.className = "tile";
  innerHTML.id = "data";

  const imageElement = document.createElement("img");
  imageElement.src = image;

  const cityName = document.createElement("h5");
  cityName.className = " tile-text text-center mb-5 heading";
  cityName.innerText = city;

  const cityDescription = document.createElement("p");
  cityDescription.className = " tile-text text-center mb-3 para";
  cityDescription.innerText = description;

  innerHTML.append(imageElement);
  innerHTML.append(cityName);
  innerHTML.append(cityDescription);

  document.querySelector("#data").append(container);

  citiesLinks.append(innerHTML);
  container.append(citiesLinks);
}

export { init, fetchCities, addCityToDOM };
