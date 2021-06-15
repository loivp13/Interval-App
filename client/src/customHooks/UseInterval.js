import React, { useEffect, useState, useRef } from "react";

export default function UseIntervalHook(callback, delay, isRunning) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (isRunning) {
      let id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay, isRunning]);
}
