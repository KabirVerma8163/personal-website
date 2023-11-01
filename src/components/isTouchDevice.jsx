import { useState, useEffect } from 'react';

export function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
      setIsTouchDevice(true);
    }
  }, []);

  return isTouchDevice;
}
