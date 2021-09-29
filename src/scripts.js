import './css/base.scss';
import Guest from '../src/classes/Guest';
import Dashboard from '../src/classes/Dashboard';
import { getBookings, getGuestById, getRooms, postBookRoom } from './apiCalls';
import { renderBooking, renderBookings, renderDashboard } from './domUpdates';

const loginButton = document.querySelector('#signInButton');
const roomFilterButton = document.querySelector('.room-type-search-button');
const roomTypeCategories = document.querySelectorAll('.room-options');
const roomFilterValue = document.querySelector('.room-type-search');
const dateFilterButton = document.querySelector('.date-filter-button');
const roomsContainer = document.querySelector('.room-options-container');
const noRoomsMessage = document.querySelector('.no-rooms-message');

let dashboard;
let newGuest;
let roomTypes;

const filterRoom = () => {
  const roomTypeValue = document.querySelector('.room-type-input').value;
  if (roomTypeValue === 'All') {
    dashboard.filterRoomByType(roomTypeValue);
    roomTypeCategories.forEach(cat => cat.classList.remove('hidden'));
  } else {
    roomTypeCategories.forEach(cat => cat.classList.add('hidden'));
    document.querySelector(`.${roomTypeValue}-options`).classList.remove('hidden');
  }
  noRoomsMessage.classList.add('hidden');
  dashboard.filterRoomByType(roomTypeValue);
}

const displayRoomsOnDom = (rooms) => {
  roomTypes.forEach(type => {
    rooms.forEach(room => {
      if (room.roomType === type) {
        document.querySelector(`.${type.split(' ').join('-')}-container`).insertAdjacentHTML('afterEnd', `
          <div class="room-div">
            <p>Room Number: ${room.number}</p>
            <p>Bed Size: ${room.bedSize}</p>
            <p>Number of Beds: ${room.numBeds}</p>
            <button value="${room.number}" class="book-button">Book Room<buttton/>
          </div>
        `)
      }
    })
  })
}

const filterRoomByType = (rooms) => {
  roomTypes = rooms.reduce((acc, room) => {
    if (!acc.includes(room.roomType)) {
      acc.push(room.roomType);
    }
    return acc;
  }, []);
  displayRoomsOnDom(rooms);
}

const calculateTotalSpent = (rooms) => {
  const totalSpent = rooms.reduce((acc, room) => {
    acc += room.costPerNight;
    return acc;
  }, 0);
  document.querySelector('.total-spent').insertAdjacentHTML('beforeEnd', `
    <p>You have spent a total of $${totalSpent} with us!</p>
  `)
  filterRoomByType(rooms);
}

const createDashboard = (rooms, bookings) => {
  dashboard = new Dashboard(rooms, bookings);
  calculateTotalSpent(rooms)
}

const getRoomData = (bookings) => {
  getRooms()
    .then(data => createDashboard(data.rooms, bookings))
    .catch(error => console.log(error));
}

const loginGuest = () => {
  const guestName = document.querySelector('#usernameInput').value;
  const guestPassword = document.querySelector('#passwordInput').value;
  const guestId = guestName.split('r')[1];

  if (guestPassword === 'overlook2021') {
    getGuest(guestId);
  } else {
    document.querySelector('.wrong-password-message').classList.remove('hidden');
  }
}

const getGuest = (guestId) => {
  getGuestById(guestId)
    .then(guestInfo => {
      retrieveGuestBookings(guestInfo);
    })
    .catch(error => console.log(error));
}

const retrieveGuestBookings = (guestInfo) => {
  getBookings()
    .then(data => {
      const guestBookings = data.bookings.filter(booking =>
        booking.userID === guestInfo.id);

      newGuest = new Guest(guestInfo, guestBookings);
      console.log(newGuest);
      renderDashboard(guestInfo);
      renderBookings(guestBookings);
      getRoomData(data.bookings);
    })
    .catch(error => console.log(error));
}

const checkDates = () => {
  noRoomsMessage.classList.add('hidden');
  const searchDate = document.querySelector('.date-filter-input').value;
  if (dashboard.updateCurrentRooms(searchDate) === 'No Rooms') {
    const remainingDivs = document.querySelectorAll('.room-div');
    remainingDivs.forEach(room => room.classList.add('hidden'));
    noRoomsMessage.classList.remove('hidden');
  }
  displayRoomsOnDom(dashboard.currentRooms);
}

const bookRoom = (event) => {
  if (!event.target.value) {
    return;
  }

  event.target.parentNode.remove();

  const userId = newGuest.id;
  const date = dashboard.currentDate;
  const roomNumber = parseInt(event.target.value, 10);

  postBookRoom(userId, date, roomNumber)
    .then(data => {
      newGuest.addNewBooking(data.newBooking);
      renderBooking(data.newBooking);
    })
    .catch(error => console.log(error))
}

loginButton.addEventListener('click', loginGuest);
roomFilterButton.addEventListener('click', filterRoom);
dateFilterButton.addEventListener('click', checkDates);
roomsContainer.addEventListener('click', bookRoom);

