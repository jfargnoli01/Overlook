/* Query selectors */
const dateFilterButton = document.querySelector('.date-filter-button');
const loginButton = document.querySelector('#signInButton');
const noRoomsMessage = document.querySelector('.no-rooms-message');
const roomsContainer = document.querySelector('.room-options-container');
const roomFilterButton = document.querySelector('.room-type-search-button');
const roomFilterValue = document.querySelector('.room-type-search');
const roomTypeCategories = document.querySelectorAll('.room-options');

/* Render functions */
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

const renderBookings = (guestBookings) => {
  guestBookings.map(booking => {
    renderBooking(booking);
  });
}

const renderBooking = (booking) => {
  document.querySelector('.guest-bookings').insertAdjacentHTML(
    'beforeEnd', `<p>You booked room ${booking.roomNumber} on ${booking.date}</p>`
  );
}

const renderDashboard = (guestInfo) => {
  document.querySelector('.login-div').classList.add('hidden');
  document.querySelector('.bookings-container').classList.remove('hidden');
  document.querySelector('.room-options-container').classList.remove('hidden');
  document.querySelectorAll('.search-container').forEach(container => container.classList.remove('hidden'));
  document.querySelector('main').insertAdjacentHTML('beforeBegin', `
  <h3 class="welcome-message">Welcome back, ${guestInfo.name}</h3>
  `);
}

const renderRooms = (roomTypes, rooms) => {
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

const renderTotalSpent = (totalSpent) => {
  document.querySelector('.total-spent').insertAdjacentHTML('beforeEnd', `
  <p>You have spent a total of $${totalSpent} with us!</p>
`)
}

export {
  dateFilterButton,
  filterRoom,
  loginButton,
  noRoomsMessage,
  roomsContainer,
  roomFilterButton,
  roomFilterValue,
  roomTypeCategories,
  renderBooking,
  renderBookings,
  renderDashboard,
  renderRooms,
  renderTotalSpent
}