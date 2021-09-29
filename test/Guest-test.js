import { expect } from 'chai';
import Guest from '../src/classes/Guest';

describe('Guest class', () => {
  let guest;
  
  beforeEach(function () {
    guest = new Guest({ id: 1, name: 'Juni' }, [{
      roomType: 'junior suite',
      roomNumber: 3
    }, {
      roomType: 'suite',
      roomNumber: 4
    }]);
  })

  it('should be an instance of Guest', () => {
    expect(guest).to.be.an.instanceof(Guest);
  })

  it('should start with an id', () => {
    expect(guest.id).to.equal(1);
  })

  it('should start with a name', () => {
    expect(guest.name).to.equal('Juni');
  })

  it('should start with guestBookings', () => {
    const expected = [{
      roomType: 'junior suite',
      roomNumber: 3
    }, {
      roomType: 'suite',
      roomNumber: 4
    }]
    expect(guest.bookings).to.deep.equal(expected);
  })
})