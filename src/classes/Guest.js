class Guest {
  constructor(details, bookings) {
    this.name = details.name;
    this.id = details.id;
    this.bookings = bookings;
  }

  addNewBooking = (newBooking) => {
    console.log(newBooking);
    this.bookings.push(newBooking);
  }
};

export default Guest;