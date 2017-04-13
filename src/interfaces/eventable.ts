interface EventHash {
  [key: string]: Array<Function>;
}

abstract class Eventable {
  private eventsHash: EventHash;

  constructor() {
    this.eventsHash = {};
  }

  /**
   * Adds an event listener
   * @param event The event name
   * @param callback The method to call when the event is fired
   */
  on(event: string, callback: Function) {
    if (!this.eventsHash[event]) {
      this.eventsHash[event] = [];
    }
    this.eventsHash[event].push(callback);
  }

  /**
   * Fires an event to all bound listeners with the passed parameters
   * @param event The event name
   * @param params The parameters to send to listeners
   */
  fire(event: string, params?: Array<any>) {
    if (this.eventsHash[event]) {
      this.eventsHash[event].forEach(callback => {
        callback.apply(callback, params);
      });
    }
  }
}

export default Eventable;