import './css/base.scss';
import Guest from '../src/classes/Guest';
import Dashboard from '../src/classes/Dashboard';
import { getBookings, getGuestById, getRooms, postBookRoom } from './apiCalls';
import {
  dateFilterButton,
  filterRoom,
  loginButton,
  noRoomsMessage,
  roomsContainer,
  roomFilterButton,
  renderBooking,
  renderBookings,
  renderDashboard,
  renderRooms,
  renderTotalSpent
 } from './domUpdates';

let dashboard;
let newGuest;
let roomTypes;

const filterRoomByType = (rooms) => {
  roomTypes = rooms.reduce((acc, room) => {
    if (!acc.includes(room.roomType)) {
      acc.push(room.roomType);
    }
    return acc;
  }, []);
  renderRooms(roomTypes, rooms);
}

const calculateTotalSpent = (rooms) => {
  const totalSpent = rooms.reduce((acc, room) => {
    acc += room.costPerNight;
    return acc;
  }, 0);
  renderTotalSpent(totalSpent);
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
  renderRooms(dashboard.currentRooms);
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

/* Event listeners */
loginButton.addEventListener('click', loginGuest);
roomFilterButton.addEventListener('click', filterRoom);
dateFilterButton.addEventListener('click', checkDates);
roomsContainer.addEventListener('click', bookRoom);