// This was imported from usehooks-ts, a website with useful hooks.
import { useEffect, useRef } from 'react';

// Hook to unmount functions that are stored on Refs.
export function useUnmount(func: () => void) {
  const funcRef = useRef(func);

  funcRef.current = func;

  useEffect(
    () => () => {
      funcRef.current();
    },
    [],
  );
}
