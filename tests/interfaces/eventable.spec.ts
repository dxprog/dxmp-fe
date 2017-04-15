import { expect } from 'chai';
import 'sinon';

import Eventable from '../../src/interfaces/eventable';

// Empty class for testing
class EventableTest extends Eventable {}

describe('Eventable tests', () => {
  let testInstance: EventableTest;
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    testInstance = new EventableTest();
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    testInstance = null;
    sandbox.restore();
  });

  it('should add the "on" and "fire" methods', () => {
    expect(testInstance.on).to.be.a('function');
    expect(testInstance.fire).to.be.a('function');
  });

  it('should call added event handler only when that event is fired', () => {
    const MY_EVENT = 'MY_EVENT';
    const eventSpy = sandbox.spy();
    testInstance.on(MY_EVENT, eventSpy);
    testInstance.fire(MY_EVENT);
    testInstance.fire('some-other-event');
    sinon.assert.calledOnce(eventSpy);
  });

  it('should invoke multiple event listeners in the order they were added', () => {
    const MY_EVENT = 'MY_EVENT';
    const firstEventSpy = sandbox.spy(() => {
      sinon.assert.notCalled(secondEventSpy);
    });
    const secondEventSpy = sandbox.spy(() => {
      sinon.assert.calledOnce(firstEventSpy);
    });
    testInstance.on(MY_EVENT, firstEventSpy);
    testInstance.on(MY_EVENT, secondEventSpy);
    testInstance.fire(MY_EVENT);
  });
});
