const getBookings = () => {
  return fetch(`http://localhost:3001/api/v1/bookings`)
    .then(response => response.json());
}

const getGuestById = (guestId) => {
  return fetch(`http://localhost:3001/api/v1/customers/${guestId}`)
    .then(response => response.json());
}

const getRooms = () => {
  return fetch(`http://localhost:3001/api/v1/rooms`)
    .then(response => response.json());
}

const postBookRoom = (userId, date, roomNumber) => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify({
      "userID": userId,
      "date": date,
      "roomNumber": roomNumber
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json());
}

export {
  getBookings,
  getGuestById,
  getRooms,
  postBookRoom,
}