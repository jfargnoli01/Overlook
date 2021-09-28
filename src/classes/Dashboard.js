class Dashboard {
  constructor(rooms, guestBookings, bookings) {
    this.rooms = rooms;
    this.currentRooms = rooms;
    this.bookings = bookings;
    this.guestBookings = guestBookings;
  }

  filterRoomByType = (type) => {
    if (type === 'All') {
      this.currentRooms = this.rooms;
      return;
    }
    this.currentRooms = this.rooms.filter(room => {
      return type.split('-').join(' ') === room.roomType;
    })
  }

  updateCurrentRooms = (date) => {
    const availableRooms = this.currentRooms.filter(room => {
      const isRoomBooked = this.bookings.find(booking => {
        if (booking.date === date && booking.roomNumber === room.number) {
          return booking;
        }
      })
      if (!isRoomBooked) {
        return true;
      }
      return false;
    })
    if (availableRooms === []) {
      console.log('Sorry, no roooooms');
    } else {
      console.log(availableRooms);
      this.currentRooms = availableRooms;
    }
  }
};

export default Dashboard;