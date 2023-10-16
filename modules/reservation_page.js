import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const backendUrl = config.backendEndpoint + "/reservations";
    const response = await fetch(backendUrl)
    const json = await response.json()
    console.log(json)
    return json
  }catch(err){
    return null
  }


  // Place holder for functionality to work in the Stubs

}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  const reservationTableParent = document.querySelector( "#reservation-table-parent")
  const noReservationBanner = document.querySelector( "#no-reservation-banner")
  
  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length === 0){
    reservationTableParent.style.display = "none"
    noReservationBanner.style.display = "block"
  }else{
    reservationTableParent.style.display = "block"
    noReservationBanner.style.display = "none"
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page
    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
 reservations.forEach((reservation)=>{
  
  const date = new Date(reservation.date); 
  const formattedDate = date.toLocaleDateString("en-IN")

  const bookingTime = new Date(reservation.time);
  let day = bookingTime.getDate()
  let month = bookingTime.toLocaleString(undefined, {month:"long"});
  let year = bookingTime.getFullYear();
  let time = bookingTime.toLocaleString("en-IN").split(" ")
  

  const reservationTable = document.querySelector("#reservation-table")
  // const buttonForAdventure = document.createElement("div")
  // buttonForAdventure.className = "reservation-visit-button"
  // buttonForAdventure.textContent = "Visit Adventure"

  // const anchorForAdventure = document.createElement("a")
  // anchorForAdventure.className = "reservation-visit-button text-white"
  // anchorForAdventure.textContent = "Visit Adventure"
  // anchorForAdventure.id = adventure.id 
  // anchorForAdventure.href = `../detail/?adventure=${reservation.adventure}`
  

  const tr = document.createElement("tr")
  tr.innerHTML = `<td>${reservation.id}</td>
  <td>${reservation.name}</td>
  <td>${reservation.adventureName}</td>
  <td>${reservation.person}</td>
  <td>${formattedDate}</td>
  <td>${reservation.price}</td>
  <td>${day} ${month} ${year}, ${time[1]} ${time[2]}</td>
  <td id="${reservation.id}"><a href="../detail/?adventure=${reservation.adventure}"/><div class="reservation-visit-button text-white">
  Visit Adventure</div></td>
  `
  reservationTable.append(tr)
 })
}

export { fetchReservations, addReservationToTable };
