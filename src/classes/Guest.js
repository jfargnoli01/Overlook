class Guest {
  constructor(details, bookings) {
    this.name = details.name;
    this.id = details.id;
    this.bookings = bookings;
  }
};

export default Guest;