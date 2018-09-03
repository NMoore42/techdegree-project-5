/*******************************************
USE A PUBLIC API TO CREATE AN EMPLOYEE DIRECTORY PROJECT
*********************************************/
const totalBios = 12;
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalPrev = document.getElementById('modal-prev');


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
  fetchData('https://randomuser.me/api/?format=json&results=' + totalBios + '&nat=us')
]).then(data => dataBlock(data))


  //-------------------------------
  // HELPER FUNCTIONS
  //-------------------------------

function dataBlock(data) {
  for (let i = 0; i <=totalBios-1; i += 1) {
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
      openModal(i);
      closeModal(i);
      modalPre(i);
      modalNext(i);
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
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
          </div>
  `;
  modalBio.setAttribute('class', 'modal-container');
  modal.appendChild(modalBio);
  modalBio.style.display = 'none';
}

//-------------------------------
// EVENT LISTNER FUNCTIONS
//-------------------------------

function openModal(input) {
  document.querySelectorAll('.card')[input].addEventListener('click', function (){
    document.querySelectorAll('.modal-container')[input].style.display = 'block';
  });
}

function closeModal(input) {
  document.querySelectorAll('.modal-close-btn')[input].addEventListener('click', function (){
    document.querySelectorAll('.modal-container')[input].style.display = 'none';
  });
}

function modalPre(input) {
  document.querySelectorAll('.modal-prev')[input].addEventListener('click', function () {
    if (input > 0) {
      document.querySelectorAll('.modal-container')[input].style.display = 'none';
      document.querySelectorAll('.modal-container')[input-1].style.display = 'block';
    } else {
      document.querySelectorAll('.modal-container')[input].style.display = 'none';
      document.querySelectorAll('.modal-container')[totalBios-1].style.display = 'block';
    }
  });
}

function modalNext(input) {
  document.querySelectorAll('.modal-next')[input].addEventListener('click', function () {
    if (input < totalBios-1) {
      document.querySelectorAll('.modal-container')[input].style.display = 'none';
      document.querySelectorAll('.modal-container')[input+1].style.display = 'block';
    } else {
      document.querySelectorAll('.modal-container')[input].style.display = 'none';
      document.querySelectorAll('.modal-container')[0].style.display = 'block';
    }
  });
}
