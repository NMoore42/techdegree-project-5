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
  fetchData('https://randomuser.me/api/?format=json')
  ]).then(data => {
    const bioPic = data[0].results[0].picture.thumbnail;
    const name = data[0].results[0].name.first.charAt(0).toUpperCase() + data[0].results[0].name.first.slice(1) +
      ' ' +
      data[0].results[0].name.last.charAt(0).toUpperCase() + data[0].results[0].name.last.slice(1);
    const email = data[0].results[0].email;
    const location = data[0].results[0].location.city.charAt(0).toUpperCase() + data[0].results[0].location.city.slice(1);
    const cellNumber = data[0].results[0].phone;
    const address = data[0].results[0].location.street + ', ' + location + ' ' + data[0].results[0].location.postcode;
    const birthday = data[0].results[0].dob.date;
    console.log(birthday);
})

/*
  .then(data => {
    const A = data[insert number].message;
    const B = data[insert number].message;

    function (for first info retrieval);
    function (for second info retrieval);
  })*/

  //-------------------------------
  // HELPER FUNCTIONS
  //-------------------------------

function checkStatus(response) {
  if(response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}
/*
function generateGalley (data) {
  const galleyBio = `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">data[0].results[0].gender</h3>
            <p class="card-text">email</p>
            <p class="card-text cap">city, state</p>
        </div>
    </div>
  `;
}

window.onload = function (){
  generateGalley();

}

/*
<div class="card">
    <div class="card-img-container">
        <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">first last</h3>
        <p class="card-text">email</p>
        <p class="card-text cap">city, state</p>
    </div>
</div>

*/
