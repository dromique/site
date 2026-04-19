'use client';

type HopSubscriber = (value: boolean) => void;

const hopSubscribers = new Set<HopSubscriber>();
let hopLoopStarted = false;

const broadcastHopState = (value: boolean) => {
  hopSubscribers.forEach((notify) => notify(value));
};

export const subscribeToSharedHop = (subscriber: HopSubscriber) => {
  hopSubscribers.add(subscriber);
  return () => {
    hopSubscribers.delete(subscriber);
  };
};

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
