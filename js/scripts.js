/*******************************************
USE A PUBLIC API TO CREATE AN EMPLOYEE DIRECTORY PROJECT
*********************************************/
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');


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
  fetchData('https://randomuser.me/api/?format=json&results=12&nat=us')
]).then(data => dataBlock(data))


  //-------------------------------
  // HELPER FUNCTIONS
  //-------------------------------

function dataBlock(data) {
  for (let i = 0; i <=11 ; i += 1) {
      const bioPic = data[0].results[i].picture.large;
      const name = data[0].results[i].name.first + ' ' + data[0].results[i].name.last;
      const email = data[0].results[i].email;
      const location = data[0].results[i].location.city + ', ' + data[0].results[i].location.state;
      const cellNumber = data[0].results[i].phone;
      const address = data[0].results[i].location.street + ', ' + location + ' ' + data[0].results[i].location.postcode;
      const birthday = 'Birthday: ' + data[0].results[i].dob.date.substring(5,7) +
                       '/' + data[0].results[i].dob.date.substring(8,10) +
                       '/' +data[0].results[i].dob.date.substring(1,3);
      generateGallery(bioPic, name, email, location);
      generateModal(bioPic, name, email, location, cellNumber, address, birthday);
      document.querySelectorAll('.card')[i].addEventListener('click', function (){
        document.querySelectorAll('.modal-container')[i].style.display = 'block';
      });
      document.querySelectorAll('.modal-close-btn')[i].addEventListener('click', function (){
        document.querySelectorAll('.modal-container')[i].style.display = 'none';
      })

  }
}

function checkStatus(response) {
  if(response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function generateGallery(image, name, email, location) {
  const galleryBio = document.createElement('div');
  galleryBio.innerHTML = `
        <div class="card-img-container">
            <img class="card-img" src="${image}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${name}</h3>
            <p class="card-text">${email}</p>
            <p class="card-text cap">${location}</p>
        </div>
  `;
  galleryBio.setAttribute('class', 'card');
  gallery.appendChild(galleryBio);
}


function generateModal(image, name, email, location, cell, address, birthday) {
  const modalBio = document.createElement('div');
  modalBio.innerHTML = `
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="${image}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${name}</h3>
              <p class="modal-text">${email}</p>
              <p class="modal-text cap">${location}</p>
              <hr>
              <p class="modal-text">${cell}</p>
              <p class="modal-text cap">${address}</p>
              <p class="modal-text">${birthday}</p>
          </div>
  `;
  modalBio.setAttribute('class', 'modal-container');
  modal.appendChild(modalBio);
  modalBio.style.display = 'none';
}

//-------------------------------
// EVENT LISTNER
//-------------------------------
