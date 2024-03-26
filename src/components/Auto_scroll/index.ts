import { EffectCallback, useEffect, useRef } from "react";

export function scrollDiv(divRef: React.RefObject<HTMLDivElement>) {
  if (divRef.current?.scrollTop !== undefined) {
    let scrollAuto = divRef.current as HTMLDivElement;
    let limit = scrollAuto.scrollHeight - scrollAuto.clientHeight;

    if (scrollAuto.scrollTop >= limit) {
      scrollAuto.scrollTop = 0;
      return;
    }
    scrollAuto.scrollTop += 600;
    return;
  }
}

export function useInterval(callback: EffectCallback, delay: number) {
  const savedCallback = useRef<EffectCallback>();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current !== undefined) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
