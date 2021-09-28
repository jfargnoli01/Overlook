// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import Guest from '../src/classes/Guest';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
const loginButton = document.querySelector('#signInButton');

const calculateTotalSpent = (rooms) => {
  const totalSpent = rooms.reduce((acc, room) => {
    acc += room.costPerNight;
    return acc;
  }, 0)
  document.querySelector('.total-spent').insertAdjacentHTML('beforeEnd', `
    <p>You have spent a total of $${totalSpent} with us!</p>
  `)
}

const getRoomData = (bookings) => {
  fetch(`http://localhost:3001/api/v1/rooms`)
  .then(response => response.json())
  .then(data => calculateTotalSpent(data.rooms))
  .catch(error => console.log(error));
}

const convertBookingsToHTML = (guestId, bookings) => {
  getRoomData(bookings);
  bookings.map(booking => {
    document.querySelector('.guest-bookings').insertAdjacentHTML(
      'beforeEnd', `<p>You booked room ${booking.roomNumber} on ${booking.date}</p>`
      );
  })
}

const retrieveGuestBookings = (guestId) => {
  const bookings = fetch(`http://localhost:3001/api/v1/bookings`)
  .then(response => response.json())
  .then(data => convertBookingsToHTML(guestId, data.bookings.filter(booking => booking.userID === guestId.id)))
  .catch(error => console.log(error));
}

const createGuest = (guestInfo) => {
  const newGuest = new Guest(guestInfo);
  document.querySelector('.login-div').classList.add('hidden');
  document.querySelector('.bookings-container').classList.remove('hidden');
  document.querySelector('.room-options-container').classList.remove('hidden');
  retrieveGuestBookings(newGuest.id)
}

const getGuest = (guestId) => {
  fetch(`http://localhost:3001/api/v1/customers/${guestId}`)
  .then(response => response.json())
  .then(data => createGuest(data))
  .catch(error => console.log(error));
}

const loginGuest = () => {
  const guestName = document.querySelector('#usernameInput').value;
  const guestPassword = document.querySelector('#passwordInput').value;
  const guestId = guestName.split('r')[1];
  if (guestPassword === 'overlook2021') {
    getGuest(guestId);
  } else {
    console.log('wrong passwrod');
  }
}

loginButton.addEventListener('click', loginGuest);

