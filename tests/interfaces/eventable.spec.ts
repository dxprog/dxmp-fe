import { expect } from 'chai';

import Eventable from '../../src/interfaces/eventable';

// Empty class for testing
class EventableTest extends Eventable {}

describe('Eventable tests', () => {
  it('should add the "on" and "fire" methods', () => {
    const testInstance = new EventableTest();
    expect(testInstance.on).to.be.a('function');
  });
});
