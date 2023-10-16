import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // const searchQuery = window.location.search
  const searchParams = new URLSearchParams(search);
  const city = searchParams.get("city");
  // console.log(city)
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const respone = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    const json = await respone.json();
    // console.log(json);
    return json;
  } catch (err) {
    // console.log(err.message);
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const parentDiv = document.querySelector("#data") 
  adventures.forEach((adventure) => {
    // Col div
    // const container = document.createElement("div");
    // container.className = "col-lg-3 col-md-6 col-sm-6 mb-3 position-relative" ;

    // // redirecting to page
    // const adventuresLink = document.createElement("a")
    // adventuresLink.href = `detail/?adventure=${adventure.id}`
    // adventuresLink.id = adventure.id
    // container.append(adventuresLink)

    // // Second parent div which is append to parent
    // const cardDiv = document.createElement("div");
    // cardDiv.className = "adventure-detail-card"
    // adventuresLink.append(cardDiv)

    // // image element
    // const imageElement = document.createElement("img");
    // imageElement.className = "activity-card-image"
    // imageElement.src = adventure.image;
    // cardDiv.append(imageElement)

    // // category banner
    // let categoryBanner = document.createElement("span");
    // categoryBanner.setAttribute("class", "category-banner");
    // categoryBanner.textContent = adventure.category;
    // container.append(categoryBanner)

    // // content div
    // const contentDiv = document.createElement("div")
    // cardDiv.append(contentDiv)
    
    // // 1 st content div
    // const divForPrice = document.createElement("div")
    // divForPrice.className = "flex-container my-2"
    // contentDiv.append(divForPrice)
    
    // // 2 nd content div
    // const divForDuration = document.createElement("div")
    // divForDuration.className = "flex-container"
    // contentDiv.append(divForDuration)

    // const adventureName = document.createElement("h5");  // 1 st content div
    // // adventureName.className = " ";
    // adventureName.innerText = adventure.name;
    // divForPrice.append(adventureName)

    // const adventurPrice = document.createElement("p");  // 1 st content div
    // // adventureName.className = " "
    // adventurPrice.innerText = "₹" + adventure.costPerHead;
    // divForPrice.append(adventurPrice)

    // const adventureDurationText = document.createElement("h5"); // 2 nd content div
    // // adventureName.className = " ";
    // adventureDurationText.textContent = "Duration" ;
    // divForDuration.append(adventureDurationText)


    // const adventureDuration = document.createElement("p");  // 2 nd content div
    // // adventureDuration.className = " ";
    // adventureDuration.innerText = adventure.duration + " Hours";
    // divForDuration.append(adventureDuration)
    
  
    // container.append(adventuresLink)


  const container = document.createElement("div");
  container.className = "col-lg-3 col-md-6 col-sm-6 mb-3 position-relative";

  // Set the innerHTML for the container
  container.innerHTML = `
    <a href="detail/?adventure=${adventure.id}" id="${adventure.id}">
      <div class="adventure-detail-card">
        <img class="activity-card-image" src="${adventure.image}" />
        <span class="category-banner">${adventure.category}</span>
        <div>
          <div class="flex-container my-2">
            <h5>${adventure.name}</h5>
            <p>₹${adventure.costPerHead}</p>
          </div>
          <div class="flex-container">
            <h5>Duration</h5>
            <p>${adventure.duration} Hours</p>
          </div>
        </div>
      </div>
    </a>`;

    parentDiv.append(container)
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  
  const filterDuration =  list.filter((adventure)=> adventure.duration >= low &&  adventure.duration <= high)
  return filterDuration
}


 

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const categories = []
  list.filter((item)=> {
    if(categoryList.includes(item.category)){
      categories.push(item)
    }
  })
  return categories
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if (filters.duration == "" && filters.category.length === 0){
    return list
  }
  else if (filters.duration !== "" && filters.category.length === 0){
    const [low, high] = filters.duration.split("-")
    return filterByDuration(list, low, high)
  }
  else if (filters.duration =="" && filters.category.length > 0){
    return filterByCategory(list, filters.category)
  }
  else if (filters.category.length !== 0 && filters.duration.length !== 0) {
    let list2 = filterByCategory(list, filters.category);
    const [low, high] = filters.duration.split("-");
    return filterByDuration(list2, low, high);
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters))
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
    const getFiltersFromLocalStorage = localStorage.getItem("filters")
    if (getFiltersFromLocalStorage){
      return JSON.parse(getFiltersFromLocalStorage)
    }else{
      return null;
    }
  // Place holder for functionality to work in the Stubs

}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const categorySection = document.querySelector("#category-list")
  filters.category.map((category)=>{
    const createCategoryFilter = document.createElement("span")
    createCategoryFilter.className = "category-filter"
    createCategoryFilter.textContent= category
    categorySection.append(createCategoryFilter)
  })
  const categorySelct = document.querySelector("#category-select")
  if(categorySelct){
    categorySelct.value = filters.category
  }
  const durationSelct = document.querySelector("#duration-select")
  if(durationSelct){
    durationSelct.value = filters.duration
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
