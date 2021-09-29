import { expect } from 'chai';
import Dashboard from '../src/classes/Dashboard';

describe('Dashboard class', () => {
  let dashboard;
  beforeEach(function () {
    dashboard = new Dashboard([{
      roomType: 'single room',
      roomNumber: 1
    }, {
      roomType: 'suite',
      roomNumber: 2
    }],
      [{
        date: "2020/04/22",
        id: "5fwrgu4i7k55hl6sz",
        roomNumber: 15,
        roomServiceCharges: [],
        userID: 9
      }, {
        date: "2020/01/24",
        id: "5fwrgu4i7k55hl6t5",
        roomNumber: 24,
        roomServiceCharges: [],
        userID: 43
      }
      ])
  });

  it('should be an instance of Dashboard', () => {
    expect(dashboard).to.be.an.instanceof(Dashboard);
  })

  it('should start with a date property', () => {
    const expected = JSON.stringify(new Date())
      .split('T')[0]
      .split('"')[1]
      .split('-')
      .join('/');
    expect(dashboard.currentDate).to.equal(expected);
  })



  it('should start with bookings', () => {
    const expected = [[{
      date: "2020/04/22",
      id: "5fwrgu4i7k55hl6sz",
      roomNumber: 15,
      roomServiceCharges: [],
      userID: 9
    }, {
      date: "2020/01/24",
      id: "5fwrgu4i7k55hl6t5",
      roomNumber: 24,
      roomServiceCharges: [],
      userID: 43
    }
    ]]
    expect(dashboard.bookings).to.deep.equal(expected);
  })

  it('should start with rooms', () => {
    const expected = [{
      roomType: 'single room',
      roomNumber: 1
    }, {
      roomType: 'suite',
      roomNumber: 2
    }]
    expect(dashboard.rooms).to.deep.equal(expected);
  })

  it('should update currentRooms with All', () => {
    const expected = [{
      roomType: 'single room',
      roomNumber: 1
    }, {
      roomType: 'suite',
      roomNumber: 2
    }]
    dashboard.filterRoomByType('All');
    expect(dashboard.currentRooms).to.deep.equal(expected);
  })

  it('should update currentRooms with different roomTypes', () => {
    const expected = [{
      roomType: 'single room',
      roomNumber: 1
    }]
    dashboard.filterRoomByType('single-room');
    expect(dashboard.currentRooms).to.deep.equal(expected);
  })

  it('should update the currentDate when updateCurrentRooms is called', () => {
    dashboard.updateCurrentRooms(2020 / 11 / 1);
    expect(dashboard.currentDate).to.equal(2020 / 11 / 1);
  })

})