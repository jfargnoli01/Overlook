class Dashboard {
  constructor(rooms, bookings) {
    this.rooms = rooms;
    this.currentRooms = rooms;
    this.bookings = bookings;
    this.currentDate = JSON.stringify(new Date())
      .split('T')[0]
      .split('"')[1]
      .split('-')
      .join('/');
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
    this.currentDate = date;
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
    if (!availableRooms.length) {
      return 'No Rooms';
    } else {
      this.currentRooms = availableRooms;
    }
  }
};

export default Dashboard;