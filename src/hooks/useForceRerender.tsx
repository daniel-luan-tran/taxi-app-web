import { useState } from 'react';

/**
 * Hook to forcing a rerender of a component.
 */
const useForceRerender = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
};

export default useForceRerender;
