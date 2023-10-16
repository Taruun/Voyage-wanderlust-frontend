import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const searchParams = new URLSearchParams(search);
  const adventureId = searchParams.get("adventure");
  return adventureId;
  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  // /adventures/detail?adventure=<adventure_id> 
  try {
    const response = await fetch
    (`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (err) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // document.getElementById("adventure-name").innerHTML = adventure.name;

  // //Setting the subtitle
  // document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle
  
  // const adventureImages = document.querySelector("#photo-gallery")
  // adventureImages.innerHTML = `getAdventureImages.forEach((imageSrc)=>{
  //   <img src=${images}/>
  //   images.src = imageSrc
  //   adventureImages.append(images)
  // })`
  
  // const adventureContent = document.querySelector("#adventure-content")
  // adventureContent.textContent = adventure.content
  document.getElementById("adventure-name").innerHTML = adventure.name;

  //Setting the subtitle
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;

  //Loading the images
  adventure.images.map((image) => {
    let adventureImage = document.createElement("div");
    adventureImage.className = "col-lg-12";
    adventureImage.innerHTML = `
    <img
        src=${image}
        alt=""
        srcset=""
        class="activity-card-image pb-3 pb-md-0"
      />
          `;
    document.getElementById("photo-gallery").append(adventureImage);
  });

  //Setting the content
  document.getElementById("adventure-content").innerHTML = adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  // const photoGallery = document.querySelector("#photo-gallery");
  // photoGallery.appendChild(carousel);
  const photoGallery = document.querySelector("#photo-gallery");
  const photoGalleryInnerHtml = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouseId" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouseId" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouseId" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`
  
  photoGallery.innerHTML = photoGalleryInnerHtml
  const carouselInner = document.querySelector(".carousel-inner")

  images.forEach((image, idx)=>{
  const carouselItem = document.createElement("div")
    if(idx === 0){
      carouselItem.className = "carousel-item active"
    }else{
      carouselItem.className = "carousel-item"
    }
    const imageElement = document.createElement("img")
    imageElement.className = "d-block w-100 imageElement"
    imageElement.src = image

    carouselItem.appendChild(imageElement);
    carouselInner.appendChild(carouselItem);

  })
  
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const reservationSoldout = document.querySelector("#reservation-panel-sold-out")
  const reservationAvailable = document.querySelector("#reservation-panel-available")
  const reservationPersonCost = document.querySelector("#reservation-person-cost")

  if(adventure.available){
    reservationSoldout.style.display = "none"
    reservationAvailable.style.display = "block"
    reservationPersonCost.textContent = adventure.costPerHead

  }else{
    reservationSoldout.style.display = "block"
    reservationAvailable.style.display = "none"

  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const total = persons * adventure.costPerHead
  // const reservationPersonCost = document.querySelector("#reservation-person-cost")
  const reservationCost = document.querySelector("#reservation-cost")
  // reservationPersonCost.textContent = adventure.costPerHead
  reservationCost.textContent = total



  
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  const myForm = document.querySelector("#myForm")
  myForm.addEventListener("submit", async (e)=>{
  e.preventDefault()
    // const myFormELe = myForm.elements;
    // const reservationData = {
    //   name: myFormELe["name"].value,
    //   date: myFormELe["date"].value,
    //   person: myFormELe["person"].value,
    //   adventure: adventure.id

    const {name, date, person} = myForm.elements
    console.log(myForm.elements)
    const reservationData = {
      name: name.value,
      date: date.value,
      person: person.value,
      adventure: adventure.id
    }
    try{
      const response = await fetch(`${config.backendEndpoint}/reservations/new`,{
        method: "POST",
        body: JSON.stringify(reservationData),
        headers:{
          'Content-Type': 'application/json' 
        }
      })

      if(response.ok){
        alert("Success!")
        location.reload()
      }
    }catch(err){
      console.log(err.message)
      alert("Failed!")
    } 
  })
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const reservedBanner = document.querySelector("#reserved-banner")
  // console.log("adventure.reserved:", adventure.reserved); // Log the value of reserved

  if(adventure.reserved){
   reservedBanner.style.display = "block"
  }else{
    reservedBanner.style.display = "none"
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
