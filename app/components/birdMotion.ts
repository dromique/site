'use client';

// This file contains the shared hopping logic for all bird components, it gives a shared state and a subsription mechanism, so that all bird components can react to the same hop events
type HopSubscriber = (value: boolean) => void;

const hopSubscribers = new Set<HopSubscriber>();
let hopLoopStarted = false;

// Broadcast the current hop state to all subscribers
const broadcastHopState = (value: boolean) => {
  hopSubscribers.forEach((notify) => notify(value));
};

// Components can subsribe to hop events, and they will receive an update when a hop occurs
export const subscribeToSharedHop = (subscriber: HopSubscriber) => {
  hopSubscribers.add(subscriber);
  return () => {
    hopSubscribers.delete(subscriber);
  };
};

// Start a loop that randomly triggers the hop event between 1 and 8 seconds
export const startSharedHopLoop = () => {
  if (hopLoopStarted) return;
  hopLoopStarted = true;

  const scheduleNextHop = () => {
    const randomDelayMs = Math.floor(Math.random() * 7001) + 1000; // 1-8s
    setTimeout(() => {
      broadcastHopState(true);
      setTimeout(() => broadcastHopState(false), 600);
      scheduleNextHop();
    }, randomDelayMs);
  };

  scheduleNextHop();
};
