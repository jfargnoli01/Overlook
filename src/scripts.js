// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)

// console.log('This is the JavaScript entry file - your code begins here.');

const getGuest = () => {
  fetch('http://localhost:3001/api/v1/customers/50')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));
}

getGuest();
