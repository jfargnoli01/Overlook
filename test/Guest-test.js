import { expect } from 'chai';
import Guest from '../src/classes/Guest';

describe('Guest class', () => {

  it('should be an instance of Guest', () => {
    const guest = new Guest(1, 'Juni');
    expect(guest).to.be.an.instanceof(Guest);
  })

  it('should start with an id', () => {
    const guest = new Guest(1, 'Juni');
    expect(guest.id).to.equal(1);
  })

  it('should start with a name', () => {
    const guest = new Guest(1, 'Juni');
    expect(guest.name).to.equal('Juni');
  })
} )