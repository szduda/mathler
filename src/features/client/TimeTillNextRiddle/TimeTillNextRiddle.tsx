import { useEffect, useState } from "react";

type TimeSpan = {
  hours: number;
  minutes: number;
};

export const getTimeTillNextRiddle = (now: number): TimeSpan => {
  const msInMin = 60 * 1000;
  const msInHour = 60 * msInMin;
  const msInDay = 24 * msInHour;
  const delta = (Math.trunc(now / msInDay) + 1) * msInDay - now;
  const hoursDelta = Math.trunc(delta / msInHour);
  return {
    hours: hoursDelta,
    minutes: Math.trunc((delta - hoursDelta * msInHour) / msInMin),
  };
};

export const TimeTillNextRiddle = () => {
  const [timeSpan, setTimeSpan] = useState<TimeSpan>();

  useEffect(() => {
    const updateClock = () => {
      const timeTillNext = getTimeTillNextRiddle(Date.now());
      setTimeSpan(timeTillNext);
    };
    updateClock();

    const interval = setInterval(() => {
      updateClock();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      Next riddle in
      {timeSpan && (
        <>
          <span className="text-2xl px-2">{timeSpan.hours}</span>h
          <span className="text-2xl px-2 animate-bounce inline-block">
            {timeSpan.minutes}
          </span>
          m
        </>
      )}
    </div>
  );
};
