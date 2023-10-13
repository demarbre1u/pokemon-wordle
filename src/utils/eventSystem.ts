import { EventList } from "@/types/EventList";

class EventSystem {
  events: EventList;

  constructor() {
    this.events = {};
  }

  on(event: string, listener: CallableFunction) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  off(event: string, listener: CallableFunction) {
    if (!this.events[event]) {
      return;
    }
    const index = this.events[event].indexOf(listener);
    if (index !== -1) {
      this.events[event].splice(index, 1);
    }
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.events[event]) {
      return;
    }
    this.events[event].forEach((listener) => {
      listener(...args);
    });
  }
}

export const eventSystem = new EventSystem();
