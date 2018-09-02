/*******************************************
USE A PUBLIC API TO CREATE AN EMPLOYEE DIRECTORY PROJECT
*********************************************/
const gallery = document.getElementById('gallery');


//-------------------------------
// FETCH FUNCTIONS
//-------------------------------

function fetchData(url) {
  return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .catch(error => console.log('Looks like there was an issue getting data!', error))
}

Promise.all([
  fetchData('https://randomuser.me/api/?format=json&results=12')
]).then(data => dataBlock(data))


  //-------------------------------
  // HELPER FUNCTIONS
  //-------------------------------

function dataBlock(data) {
  for (let i = 0; i <=11 ; i += 1) {
      const bioPic = data[0].results[i].picture.large;
      const name = data[0].results[i].name.first.charAt(0).toUpperCase() + data[0].results[i].name.first.slice(1) +
        ' ' +
        data[0].results[i].name.last.charAt(0).toUpperCase() + data[0].results[i].name.last.slice(1);
      const email = data[0].results[i].email;
      const location = data[0].results[i].location.city.charAt(0).toUpperCase() + data[0].results[i].location.city.slice(1) +
        ', ' +
        data[0].results[i].location.state.charAt(0).toUpperCase() + data[0].results[i].location.state.slice(1);
      const cellNumber = data[0].results[i].phone;
      const address = data[0].results[i].location.street + ', ' + location + ' ' + data[0].results[i].location.postcode;
      const birthday = data[0].results[i].dob.date;
      generateGallery(bioPic, name, email, location);
  }
}

function checkStatus(response) {
  if(response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function generateGallery(dataImage, dataName, dataEmail, dataLocation) {
  const galleryBio = `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${dataImage}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${dataName}</h3>
            <p class="card-text">${dataEmail}</p>
            <p class="card-text cap">${dataLocation}</p>
        </div>
    </div>
  `;
  gallery.innerHTML += galleryBio;
}
