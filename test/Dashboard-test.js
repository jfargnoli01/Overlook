import { expect } from 'chai';
import Dashboard from '../src/classes/Dashboard';

describe('Dashboard class', () => {
  let dashboard;
  beforeEach(function() {
    dashboard = new Dashboard([{
        roomType: 'single room', 
        roomNumber: 1
      }, {
        roomType: 'suite', 
        roomNumber: 2
      }], 
      [{
        roomType: 'residential suite', 
        roomNumber: 7
      }, {
        roomType: 'single room', 
        roomNumber: 10
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
    const expected = [{
      roomType: 'residential suite', 
      roomNumber: 7
    }, {
      roomType: 'single room', 
      roomNumber: 10
    }]
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
    dashboard.updateCurrentRooms(2020/11/1);
    expect(dashboard.currentDate).to.equal(2020/11/1);
  })

})