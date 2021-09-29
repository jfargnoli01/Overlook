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

export {
  renderBooking,
  renderBookings,
  renderDashboard,
}